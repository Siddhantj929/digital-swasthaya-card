const { pdb } = require("../database");
const Node = require("../models/node");
const User = require("../models/user");

exports.getNode = async nodeId => await Node.findById(nodeId);

exports.getAllNodes = async userId => await Node.find({ userId });

exports.addNode = async node => {
	const newnNode = await Node(node).save();
	setTimeout(this.submitProof.bind(node.patientId), 1000);
	return newnNode;
};

exports.submitProof = async patientId => {
	const proof = await pdb.submitProof();
	setTimeout(this.validateChain.bind(this, proof.proofId, patientId), 10000);
};

exports.validateChain = async (proofId, patientId) => {
	try {
		const verification = await pdb.verifyProof(proofId);
		const user = await User.findById(patientId);
		user.chainVerified = verification.proofStatus;
		await user.save();
	} catch (err) {
		console.log(err);
	}
};
