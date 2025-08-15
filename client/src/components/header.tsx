export default function Header() {
  return (
    <section id="masthead" className="sticky top-0 z-50">
      <div className="fixed left-0 top-0  w-96 overflow-y-scroll bg-white transition-transform duration-150 -translate-x-full transform"></div>

      <div
        id="MastheadContainer"
        style={{ zIndex: 10000000 }}
        className="relative flex flex-col bg-gray-800 bg-opacity-80 px-5"
      >
        {/* Horizontal Categories */}
        <div
          className="flex py-8 flex-row items-center justify-center gap-4 font-centra uppercase text-white max-lg:hidden overflow-hidden transition-[height] duration-300 h-[23px]"
          aria-label="Masthead horizontal categories"
        >
          <ul className="flex flex-row justify-center gap-4 text-xs font-normal leading-4 tracking-[1.4px]">
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686] font-bold text-premium">
              <a href="https://www.fastcompany.com/premium?itm_source=dek&itm_medium=lander&itm_campaign=main">
                Premium
              </a>
            </li>
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686]">
              <a href="https://www.fastcompany.com/co-design">Design</a>
            </li>
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686]">
              <a href="https://www.fastcompany.com/technology">Tech</a>
            </li>
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686]">
              <a href="https://www.fastcompany.com/work-life">Work Life</a>
            </li>
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686]">
              <a href="https://www.fastcompany.com/news">News</a>
            </li>
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686]">
              <a href="https://www.fastcompany.com/impact">Impact</a>
            </li>
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686]">
              <a href="/podcasts" target="_blank" rel="noopener noreferrer">
                Podcasts
              </a>
            </li>
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686]">
              <a href="">Video</a>
            </li>
            <li className="border-b-[6px] border-transparent transition-colors duration-500 hover:border-[#868686]">
              <a href="" target="_blank" rel="noopener noreferrer">
                INNOVATION FESTIVAL
              </a>
            </li>
          </ul>
          <span>|</span>
          <div
            className="flex flex-row items-center gap-2 border-b-[5px] pr-2 text-xxs font-bold leading-5 tracking-[1.05px] bg-inherit border-transparent rounded-none"
            aria-label="Fast company co work navigation section"
          >
            <svg
              width="20"
              height="21"
              aria-label="Fast company coworks w icon"
            >
              <use href="/_public/sprite.svg?v=21#fc-coworks-w"></use>
            </svg>
            <a className="line-clamp-1" href="/fcw">
              FastCo Works
            </a>
            <svg width="8" height="8" aria-label="Right white arrow icon">
              <use href="/_public/sprite.svg?v=21#right-arrow-white"></use>
            </svg>
            <ul className="flex flex-row gap-4 overflow-hidden tracking-[1.17px] transition-[width] w-[0px]">
              <li>
                <a className="line-clamp-1" href="">
                  IBM
                </a>
              </li>
              <li>
                <a className="line-clamp-1" href="">
                  Texas A&M University
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
