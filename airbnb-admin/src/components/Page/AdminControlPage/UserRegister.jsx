import {
    List,
    Datagrid,
    TextField,
    Edit,
    Labeled,
    SimpleForm,
    EditButton,
    TextInput,
    Create,
    EmailField,
    ArrayInput, SimpleFormIterator
} from 'react-admin';
import { useRecordContext } from 'react-admin';

const SelectedItemsField = ({ label }) => {
    const record = useRecordContext();

    if (!record || !record.selectedItems) {
        return null;
    }

    return (
        <ul>
            {record.selectedItems.map((item) => (
                <li key={item.id}>
                    <strong>ID:</strong> {item.id}, <strong>Name:</strong> {item.name}, <strong>Address:</strong> {item.address}
                </li>
            ))}
        </ul>
    );
};

export const ListUser = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="name" />
                <EmailField source="email" />
                <TextField source="password" />
                <SelectedItemsField label="Selected Items" />
                <EditButton basePath="/user-register" />
            </Datagrid>
        </List>
    );
};



export const EditUser = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source='name' />
            <TextInput source='email' />
            <TextInput source='password' />
            <ArrayInput source="selectedItems">
                <SimpleFormIterator>
                        <TextInput source="complete" />
                </SimpleFormIterator>
            </ArrayInput>

        </SimpleForm>
    </Edit>
);

export const CreateUser = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source='name' />
            <TextInput source='email' />
            <TextInput source='password' />
        </SimpleForm>
    </Create>
);

