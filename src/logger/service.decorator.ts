import getLogger from '../loaders/loggerLoader';

export default (target: Function) => {
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
    Object.entries(descriptors).forEach(([name, descriptor]) => {
        if (name === 'constructor' || typeof descriptor.value !== 'function') {
            return;
        }
        // eslint-disable-next-line func-names
        target.prototype[name] = async function (...args: any[]) {
            const logger = getLogger('debug');
            logger.debug(
                `${target.name}.${name}() called with args: ${JSON.stringify(args)}`
            );
            logger.profile(`${target.name}.${name}()`);
            const result = await descriptors[name].value.call(this, ...args);
            logger.profile(`${target.name}.${name}()`);

            return result;
        };
    });
};
