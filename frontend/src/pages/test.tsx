import { useState } from 'react';

const Test = () => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <div className='relative w-full h-screen'>
      <div className='absolute left-0 w-full h-full grid grid-cols-5 grid-rows-4'>
        <div className='border border-black' onClick={() => console.log('5')}>5</div>
        <div className='border border-black col-span-4 row-span-4'>2</div>

        <div className='border border-black'>6</div>
        <div className='border border-black'>7</div>
        <div className='border border-black'>4</div>
      </div>
      <div className='absolute left-0 w-full h-full grid grid-cols-5 grid-rows-4'>
        <div className='border border-black' >5</div>
        <div className='border border-black col-span-4 row-span-4'>2</div>

        <div className='border border-black' onClick={() => console.log('6')}>6</div>
        <div className='border border-black'>7</div>
        <div className='border border-black'>4</div>
      </div>

      {/* <div className='absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-5'>
        <div className='row-span-4 border border-black'>1</div>
        <div className='col-span-3 row-span-4 border border-black'>2</div>
        <div className='row-span-4 border border-black'>3</div>
        <div className='border border-black'>4</div>
        <div className='border border-black'>5</div>
        <div className='border border-black'>6</div>
        <div className='border border-black'>7</div>
        <div className='border border-black'>8</div>
      </div>

      <div className='absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-5'>
        <div className='row-span-4 border border-black'>1</div>
        <div className='col-span-3 row-span-4 border border-black'>2</div>
        <div className='row-span-4 border border-black'>3</div>
        <div className='border border-black'>4</div>
        <div className='border border-black'>5</div>
        <div className='border border-black'>6</div>
        <div className='border border-black'>7</div>
        <div className='border border-black'>8</div>
      </div> */}
    </div>
    // <div className='relative w-full h-screen'>
    //   <div className='absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2 px-[100px]'>
    //     <div className='border border-black flex justify-center'>
    //       <div className='w-[500px] h-[500px] border border-black '></div>
    //     </div>
    //     <div className='border border-black'>2</div>
    //     <div className='border border-black'>3</div>
    //     <div className='border border-black'>4</div>
    //     {/* <div className='row-span-4 border border-black'>3</div>
    //     <div className='border border-black'>4</div>
    //     <div className='border border-black'>5</div>
    //     <div className='border border-black'>6</div>
    //     <div className='border border-black'>7</div>
    //     <div className='border border-black'>8</div> */}
    //   </div>
    //   {/* <div className='absolute left-1/2 translate-x-[-50%] p-2 rounded-xl'>
    //     <div className='leftbottom-0 translate-x-[-50%] w-[500px] mb-[60px] h-[500px] border '>2</div>
    //   </div> */}

    //   {/* <div className='absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-5'>
    //     <div className='row-span-4 border border-black'>1</div>
    //     <div className='col-span-3 row-span-4 border border-black'>2</div>
    //     <div className='row-span-4 border border-black'>3</div>
    //     <div className='border border-black'>4</div>
    //     <div className='border border-black'>5</div>
    //     <div className='border border-black'>6</div>
    //     <div className='border border-black'>7</div>
    //     <div className='border border-black'>8</div>
    //   </div>

    //   <div className='absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-5'>
    //     <div className='row-span-4 border border-black'>1</div>
    //     <div className='col-span-3 row-span-4 border border-black'>2</div>
    //     <div className='row-span-4 border border-black'>3</div>
    //     <div className='border border-black'>4</div>
    //     <div className='border border-black'>5</div>
    //     <div className='border border-black'>6</div>
    //     <div className='border border-black'>7</div>
    //     <div className='border border-black'>8</div>
    //   </div> */}
    // </div>
  );
};
export default Test;

{
  /* <div className='relative w-full h-screen'>
      <button
        className={`absolute right-0 top-0 m-4 bg-blue-500 text-white px-3 py-2 rounded-full ${
          isShowing ? 'hidden' : 'block'
        }`}
        onClick={() => setIsShowing(true)}
      >
        <img src='/icons/members.svg' width={20} />
      </button>
      <div className={`transition-all duration-500 ${isShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className='border border-black bg-white right-0 top-0 absolute w-[400px] h-full mb-[60px]'>
          <button className='bg-blue-500 text-white px-3 py-2 rounded-full m-4' onClick={() => setIsShowing(false)}>
            <img src='/icons/close.svg' width={20} />
          </button>
          <div className='p-4'>
            <div className='border border-blue-500 rounded-lg p-2 flex justify-between'>
              <div>Imeprezime Imeprezime</div>
              <button>
                <img src='/icons/show.svg' width={20} />
              </button>
            </div>
            <div>asd</div>
          </div>
        </div>
      </div>
    </div> */
}
{
  /* <div className='relative w-full h-screen'>
      <div className='absolute left-0 w-full h-full grid grid-cols-5 grid-rows-5'>
        <div className='row-span-4 border border-black'>1</div>
        <div className='col-span-3 row-span-4 border border-black'>2</div>
        <div className='row-span-4 border border-black'>3</div>
        <div className='border border-black'>4</div>
        <div className='border border-black'>5</div>
        <div className='border border-black'>6</div>
        <div className='border border-black'>7</div>
        <div className='border border-black'>8</div>
      </div>

      <div className='absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-5'>
        <div className='row-span-4 border border-black'>1</div>
        <div className='col-span-3 row-span-4 border border-black'>2</div>
        <div className='row-span-4 border border-black'>3</div>
        <div className='border border-black'>4</div>
        <div className='border border-black'>5</div>
        <div className='border border-black'>6</div>
        <div className='border border-black'>7</div>
        <div className='border border-black'>8</div>
      </div>

      <div className='absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-5'>
        <div className='row-span-4 border border-black'>1</div>
        <div className='col-span-3 row-span-4 border border-black'>2</div>
        <div className='row-span-4 border border-black'>3</div>
        <div className='border border-black'>4</div>
        <div className='border border-black'>5</div>
        <div className='border border-black'>6</div>
        <div className='border border-black'>7</div>
        <div className='border border-black'>8</div>
      </div>
    </div> */
}
