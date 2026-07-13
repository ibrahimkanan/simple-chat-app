import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useCoversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");

    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            toast.error("Search must be at least 3 characters long");
        }

        const conversation = conversations.find((conversation) =>
            conversation.fullName.toLowerCase().includes(search.toLowerCase()),
        );

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("No such user found");
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex itmes-center gap-2">
            <input
                type="text"
                placeholder="Search...."
                className="input input-borderd rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-cricle bg-sky-500 text-white"
            >
                <IoSearchSharp />
            </button>
        </form>
    );
};

export default SearchInput;
