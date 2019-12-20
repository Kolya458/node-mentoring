export default {
    'type': 'object',
    'properties': {
        'login': {
            'type': 'string'
        },
        'password': {
            'type': 'string',
            'pattern': '^(?=.*[a-zA-Z])(?=.*[0-9])'
        },
        'age': {
            'type': 'number',
            'maximum': 130,
            'minimum': 4
        }
    },
    'required': [
        'login',
        'password',
        'age'
    ]
};
