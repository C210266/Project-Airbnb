import { List, Datagrid, TextField, Edit, SimpleForm, EditButton, TextInput, Create } from 'react-admin';

export const ListItem = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='id' />
                <TextField source='name' />
                <TextField source='address' />
                <TextField source='price' />
                <TextField source='rating' />
                <TextField source='img' />

                <EditButton basePath='/items' />
            </Datagrid>
        </List>
    );
};

export const EditItem = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source='name' />
            <TextInput source='address' />
            <TextInput source='price' />
            <TextInput source='rating' />
            <TextInput source='img' />
        </SimpleForm>
    </Edit>
);

export const CreateItem = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source='name' />
            <TextInput source='address' />
            <TextInput source='price' />
            <TextInput source='rating' />
            <TextInput source='img' />
        </SimpleForm>
    </Create>
);
