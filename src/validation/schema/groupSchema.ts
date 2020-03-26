export default {
    'type': 'object',
    'properties': {
        'name': {
            'type': 'string'
        },
        'permissions': {
            'type': 'array',
            'items': {
                'enum': ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
            }
        }
    },
    'required': [
        'name',
        'permissions'
    ]
};
