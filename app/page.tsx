import Image from "next/image";

export default function Home() {
  const addPet = () => {
    addPet({
      name: "string",
      tag: "string",
    });
  };
  return (
    <div className="bg-neutral-white">
      <button>addpet</button>
      <button>updatpet</button>
    </div>
  );
}
