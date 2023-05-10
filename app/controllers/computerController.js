const Computer = require('../models/computerModel')

exports.getComputers = async (req, res) => {
    const computers = await Computer.find();
    if (!computers) {
        res.status(404).send({ message: `No data found` })
    }
    else {
        res.send(computers);
    }
}


exports.getComputer = async (req, res) => {
    const computer = await Computer.findById(req.params.id)
    if (!computer) {
        res.status(404).send({ message: `Cannot get computer with id : ${req.params.id}` })
    }
    else {
        res.send(computer);
    }
}

exports.addComputer = (req, res) => {
    let computer = new Computer({
        label: req.body.label,
        type: req.body.type,
    })

    computer.save().then(computer => {
        res.status(200).send(computer)
    }).catch(error => {
        res.status(500).send(`Cannot save computer to database, error : ${error}`)
    });

}

exports.editComputer = async (req, res) => {
    const updatedComputer = await Computer.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedComputer) {
        res.status(404).send({ message: `Cannot edit computer with id : ${req.params.id}` })
    } else {
        res.send(updatedComputer);
    }
}

exports.removeComputer = async (req, res) => {
    const deletedComputer = await Computer.findByIdAndRemove(req.params.id);
    if (!deletedComputer) {
        res.status(404).send({ message: `Cannot delete computer with id : ${req.params.id}` })
    } else {
        res.send(deletedComputer);
    }
}