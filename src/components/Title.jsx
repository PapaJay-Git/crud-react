
export default function Title({ children }){
    return (
        <h1 className='font-bold text-3xl my-10 p-3 bg-black h-fit text-gray-200 tracking-widest'>
            { children }
        </h1>
    );
}