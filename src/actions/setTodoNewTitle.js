let setTaskNewTitle = function (input, state) {
	state.merge(['tasks', input.ref], {
		$newTitle: input.title
	});
};

export default setTaskNewTitle;
