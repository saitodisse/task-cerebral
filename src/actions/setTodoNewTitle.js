let setTaskNewTitle = function (args, state) {
	state.merge(['tasks', args.ref], {
		$newTitle: args.title
	});
};

export default setTaskNewTitle;
