"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar.js";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import SignOutButton from "@/components/SignOutButton";
import CommentModal from "@/components/CommentModal";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { db } from "../../../../firebase";
import { doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import Post from "@/components/Post";
async function getNewsArticles() {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
  );
  return res.json();
}
async function getAccounts() {
  const res = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,picture,login"
  );
  return res.json();
}
export default function PostPage() {
  const [newsResults, setNewsResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState();
  const router = useRouter();
  const { id } = useParams();
  const fetchData = async () => {
    const newsData = await getNewsArticles();
    const usersData = await getAccounts();
    setNewsResults(newsData);
    setUsers(usersData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => {
      setPost(snapshot);
    });
  }, [db, id]);
  return (
    <main className="flex min-h-screen max-w-full mx-auto">
      <Sidebar />
      <div className="xl:ml-[360px] border-l border-gray-200 border-r xl:min-w-[676px] sm:ml-[70px] flex-grow max-w-[676px] ">
        <div className=" items-center flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <div
            onClick={() => router.push("/")}
            className="hoverEffect flex items-center justify-start px-0 ml-2 w-9 h-9"
          >
            <ArrowLeftIcon className="h-5" />
          </div>
          <h2 className="xl:text-lg sm:text-xl font-bold cursor-pointer ">
            Tweet
          </h2>
        </div>
        <Post id={id} post={post} />
      </div>
      <Widgets newsResults={newsResults.articles} users={users.results} />
      <SignOutButton />
      <CommentModal />
    </main>
  );
}
