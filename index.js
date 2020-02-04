import dimitri from 'dimitri';

const {getString} = dimitri;

const createPasswordGen = (alpha=true, numeric=true, special=true) => {
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
            (req, res, next) => res.send(req.body.length ? {password: passwordGen(req.body.length)} : 400)
        ]},
    ]
}];