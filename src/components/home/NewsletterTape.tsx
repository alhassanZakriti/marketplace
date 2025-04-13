
const NewsletterTape = () => {
  return (
    <div className="w-full py-10 px-[10em] lt-lg:flex-col lt-lg:text-center gap-4 bg-greentheme mb-3 flex items-center justify-between ">
      <div className="flex flex-col text-white">
        <h1 className="">Get notification from us every update!</h1>
        <h4 className="">Subscribe & Get all notification from us</h4>
      </div>
      <form className="bg-white flex p-2 rounded-xl w-[30em] gap-3 ">
        <input type="email" placeholder="Enter your Email" className="inputs"/>
        <button className="btn-primary">
            Subscribe    
        </button> 
      </form>
    </div>
  )
}

export default NewsletterTape
