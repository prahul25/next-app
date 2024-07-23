

export default function page({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
<h1>Profile Details</h1>
<h2 className="bg-green-500 text-black p-3">{params.id}</h2>
    </div>
  )
}

