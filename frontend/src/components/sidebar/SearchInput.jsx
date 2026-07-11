import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
	return (
		<form className="flex itmes-center gap-2">
			<input
				type="text"
				placeholder="Search...."
				className="input input-borderd rounded-full"
			/>
			<button type="submit" className="btn btn-cricle bg-sky-500 text-white">
				<IoSearchSharp />
			</button>
		</form>
	);
};

export default SearchInput;
