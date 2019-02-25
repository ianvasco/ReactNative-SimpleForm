import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000'
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic'
    },
    git: {
        fontSize: 11,
        fontStyle:'italic',
    },
    lenguaje: {
      fontSize: 11,
      fontStyle:'italic'
    }
});

const CustomRow = ({ nombre, descripcion, branch, url, lenguaje }) => (
    <View style={styles.container} key={url}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
                Nombre:{nombre}
            </Text>
            <Text style={styles.description}>
                Descripcion:{descripcion}
            </Text>
            <Text style={styles.git}>
                Branch:{branch}
            </Text>
            <Text style={styles.git}>
                Url:{url}
            </Text>
            <Text style={styles.lenguaje}>
                Lenguaje:{lenguaje}
            </Text>
        </View>

    </View>
);

export default CustomRow;
