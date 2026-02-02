import { useEffect, useMemo, useState } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert } from 'react-native';
import { isCancel, pick, types } from '@react-native-documents/picker';
import { formatBytes } from '../../utils/formatters';
import { createMockFile } from '../../utils/fileUtils';
import { styles } from './FilePicker.styles';

const mockFiles = [
  createMockFile('ID_Card.jpg', 2.4 * 1024 * 1024, 'image/jpeg'),
  createMockFile('Passport.pdf', 1.8 * 1024 * 1024, 'application/pdf'),
  createMockFile('Avatar.png', 850 * 1024, 'image/png'),
];

export const FilePicker = ({
  label,
  value,
  onChange,
  maxFiles = 3,
  maxSizeBytes = 10 * 1024 * 1024,
  allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'],
  helperText,
  errorText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [localError, setLocalError] = useState('');
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const filteredFiles = useMemo(() => {
    if (filter === 'All') {
      return mockFiles;
    }
    if (filter === 'Images') {
      return mockFiles.filter(file => file.mimeType.startsWith('image/'));
    }
    return mockFiles.filter(file => file.mimeType === 'application/pdf');
  }, [filter]);

  const toggleFile = file => {
    setLocalError('');
    const exists = selected.some(item => item.id === file.id);
    if (exists) {
      setSelected(selected.filter(item => item.id !== file.id));
      return;
    }
    if (selected.length >= maxFiles) {
      setLocalError(`Max ${maxFiles} files allowed`);
      return;
    }
    if (file.sizeBytes > maxSizeBytes) {
      setLocalError(`Max ${formatBytes(maxSizeBytes)} per file`);
      return;
    }
    if (!allowedTypes.includes(file.mimeType)) {
      setLocalError('Unsupported file type');
      return;
    }
    setSelected([...selected, file]);
  };

  const commitSelection = () => {
    onChange(selected);
    setIsOpen(false);
  };

  const removeFile = id => {
    const next = value.filter(item => item.id !== id);
    onChange(next);
    setSelected(next);
  };

  const pickDocument = async () => {
    try {
      setLocalError('');
      const results = await pick({
        // type: [types.pdf, types.images],
        allowMultipleSelection: true,
        copyTo: 'cachesDirectory',
      });

      const newFiles = [];
      for (const result of results) {
        if (selected.length + newFiles.length >= maxFiles) {
          setLocalError(`Max ${maxFiles} files allowed`);
          break;
        }
        if (result.size > maxSizeBytes) {
          setLocalError(
            `File ${result.name} exceeds ${formatBytes(maxSizeBytes)}`,
          );
          continue;
        }
        // if (!allowedTypes.includes(result.type)) {
        //   setLocalError(`File type ${result.type} not allowed`);
        //   continue;
        // }

        const fileUri = result.fileCopyUri || result.uri;
        console.log('Picked file:', result.name, 'URI:', fileUri);

        newFiles.push({
          id: result.uri || `${result.name}-${Date.now()}`,
          name: result.name,
          sizeBytes: result.size,
          mimeType: result.type,
          uri: fileUri,
          addedAt: new Date().toISOString(),
        });
      }

      if (newFiles.length > 0) {
        const updated = [...selected, ...newFiles];
        setSelected(updated);
        onChange(updated);
        setIsOpen(false);
      }
    } catch (err) {
      if (isCancel(err)) {
        // User cancelled
      } else {
        setLocalError('Failed to pick document');
        Alert.alert('Error', 'Failed to pick document: ' + err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.addText}>+ Add Document</Text>
        </TouchableOpacity>
        {value.map(file => (
          <View key={file.id} style={styles.fileItem}>
            <View>
              <Text style={styles.fileName}>📄 {file.name}</Text>
              <Text style={styles.fileMeta}>
                {formatBytes(file.sizeBytes)} • {file.mimeType}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFile(file.id)}
            >
              <Text style={styles.removeText}>🗑</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.helper}>• Max {maxFiles} files</Text>
        <Text style={styles.helper}>
          • Max {formatBytes(maxSizeBytes)} per file
        </Text>
        <Text style={styles.helper}>• Allowed: PDF, JPG, PNG</Text>
      </View>
      {localError ? (
        <Text style={styles.error}>{localError}</Text>
      ) : errorText ? (
        <Text style={styles.error}>{errorText}</Text>
      ) : helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
      <Modal visible={isOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Select Files</Text>
            <Text style={styles.helper}>File Types:</Text>
            <View style={styles.filterRow}>
              {['Images', 'PDF', 'All'].map(item => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.filterButton,
                    filter === item && styles.filterButtonActive,
                  ]}
                  onPress={() => setFilter(item)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === item && styles.filterTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.helper}>Recent Files:</Text>
            {filteredFiles.map(file => {
              const isSelected = selected.some(item => item.id === file.id);
              return (
                <TouchableOpacity
                  key={file.id}
                  style={styles.modalListItem}
                  onPress={() => toggleFile(file)}
                >
                  <View>
                    <Text style={styles.fileName}>📷 {file.name}</Text>
                    <Text style={styles.fileMeta}>
                      {formatBytes(file.sizeBytes)} • Today
                    </Text>
                  </View>
                  <Text style={styles.fileMeta}>{isSelected ? '●' : '○'}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.modalListItem}
              onPress={pickDocument}
            >
              <View>
                <Text style={styles.fileName}>📁 Browse Device Storage</Text>
                <Text style={styles.fileMeta}>Select from your files</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.modalFooter}>
              <Text style={styles.helper}>
                Selected: {selected.length} files (
                {formatBytes(
                  selected.reduce((sum, file) => sum + file.sizeBytes, 0),
                )}
                )
              </Text>
              {localError ? (
                <Text style={styles.error}>{localError}</Text>
              ) : null}
              <View style={styles.footerButtonRow}>
                <TouchableOpacity
                  style={[styles.footerButton, styles.footerButtonSecondary]}
                  onPress={() => setIsOpen(false)}
                >
                  <Text
                    style={[
                      styles.footerButtonText,
                      styles.footerButtonTextSecondary,
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.footerButton}
                  onPress={commitSelection}
                >
                  <Text style={styles.footerButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
