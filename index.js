import dimitri from 'dimitri';

const {getString} = dimitri;

const createPasswordGen = (alpha=true, numeric=true, special=false) => {
    const passwordGen = getString(`${
        alpha ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" : ""
    }${
        numeric ? "0123456789" : ""
    }${
        special ? "!#$%&?" : ""
    }`);
    return (len) => passwordGen(len)
}

// eventually this should allow for some variation at request time
const passwordGen = createPasswordGen();

export default ({config, boundary, logger, messageHandler, entityMapper}) => [{
    resource: "/",
    behaviors: [
        {endpoint: "/", method: "get", behavior: [
           (_, res) => res.send({password: passwordGen(16)})
        ]},
    ]
}];