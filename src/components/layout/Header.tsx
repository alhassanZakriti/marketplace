import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import Logo from './Logo';
import SearchBar from '../search/SearchBar';

const Header = () => {
  const [shouldShowSearchBar, setShouldShowSearchBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShouldShowSearchBar(true);
      } else {
        setShouldShowSearchBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className='z-[50] sticky top-0 p-2 items-center flex justify-between gap-1 px-6 lt-sm:px-2 shadow-lg shadow-[#00000007] bg-white'>
      <Logo className='horizontal' />
      <div className='lt-lg:hidden '>
        {shouldShowSearchBar && <SearchBar />}
      </div>
      <div className='flex flex-col justify-center items-end gap-2'>
        <div className='flex items-center gap-2 text-greentheme text-sm font-semibold'>
          <button className='hover:underline'>For Business</button>
          <p className='text-[#00000099]'>|</p>
          <button className='hover:underline'>Contact Us</button>
        </div>
        <div className='flex items-center gap-2'>
          <button className='btn flex gap-2'>
            <span className='lt-sm:hidden blocl'>Get our app</span> <Download size={24} />
          </button>
          <button className='btn-primary'>Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
