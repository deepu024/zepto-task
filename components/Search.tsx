"use client"

import { usersList } from "@/utils/helper";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

const Search = () => {
    const [value, setValue] = useState('')
    const [tags, setTags] = useState<any>([])
    const [users, setUsers] = useState<any>(usersList)

    const handleTagClick = (element: any) => {
        setTags([...tags, element]);
        const list = users.filter((user: any) => user.id !== element.id)
        setUsers(list);
        setValue("")
        let searchRes = usersList.filter((user: any) => user.id !== element.id && tags.includes(user) !== true)
        setUsers(searchRes);
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (!e.target.value) {
            const list = usersList.filter((user: any) => tags.includes(user) !== true)
            setUsers(list);
            return;
        }
        let searchRes = usersList.filter((user: any) => (user.firstName.toLowerCase().includes((e.target.value).toLowerCase()) || user.email.toLowerCase().includes((e.target.value).toLowerCase())) && tags.includes(user) !== true)
        setUsers(searchRes);
    }

    const removeTag = (tag: any) => {
        const list = tags.filter((tg: any) => tag.id !== tg.id);
        setUsers([...users, tag])
        setTags(list)
    }

    return (
        <div className="relative m-10">

            <div className=" pb-2 w-full flex flex-wrap space-x-2 overflow-hidden">
                {
                    tags &&
                    <div className="flex  flex-wrap gap-3">
                        {
                            tags.map((tag: any) => (
                                <div key={tag.id} className="flex gap-x-1 gap-y-3 bg-gray-200 rounded-full w-fit justify-start items-center px-2 py-1">
                                    <Image
                                        className="rounded-full object-contain mr-1"
                                        src={tag.image}
                                        alt="User"
                                        width={12}
                                        height={12}
                                    />
                                    <p className="flex">{tag.firstName} {tag.lastName}</p>
                                    <div className="cursor-pointer" onClick={() => removeTag(tag)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                <div className="relative w-full h-full">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={value}
                        onChange={handleSearch}
                        className="outline-none border-none w-full h-8 px-5 "
                    />
                    <div className="top-0 shadow-lg w-fit max-h-64 min-h-fit overflow-auto z-10 flex flex-col bg-white">
                        {
                            users.length === 0 ? 
                            <div className="p-3 w-full flex space-x-5 cursor-pointer items-center hover:bg-gray-100">
                                <p>No Results!</p>
                            </div> : (
                                users.map((user: any) => (
                                    <div key={user.id} className="p-3 flex space-x-5 cursor-pointer items-center hover:bg-gray-100" onClick={() => handleTagClick(user)}>
                                        <Image
                                            src={user.image}
                                            alt={user.firstName}
                                            width={30}
                                            height={30}
                                        />
                                        <div className="flex-1">
                                            <p>{user.firstName + user.lastName}</p>
                                        </div>
                                        <div className="flex-2 items-start justify-start">
                                            <p className="text-stat w-fit">{user.email}</p>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                        { }
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Search