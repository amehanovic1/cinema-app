import theaterHall from '../../assets/denise-jans-the-newbury-boston-fall-theatre.jpg'

const AboutUs = () => {
    return (
        <div>

            <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-4 px-6 sm:px-12 md:px-16 lg:px-24 py-8 sm:py-12">
                
                <div className='hidden lg:block'></div>
                
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-800">
                    About Us
                </h1>

                <div className="flex flex-col font-bold text-lg sm:text-xl md:text-2xl text-neutral-800 space-y-2 sm:space-y-3 md:space-y-4">
                    <h1>About Our Dream.</h1>
                    <h1>Our History.</h1>
                    <h1>Cinema.</h1>
                </div>

                <div className="justify-start">
                    <p className="font-normal text-sm sm:text-base md:text-lg text-neutral-800 leading-relaxed sm:leading-7 md:leading-8">
                        Welcome to Cinebh, where movie magic comes to life.<br />
                        At Cinebh, we're not just about screening films; we're passionate about creating unforgettable cinematic experiences.<br />
                        Since our establishment, we've been dedicated to providing our audience with top-quality entertainment in a comfortable and welcoming environment.<br />
                        Our state-of-the-art facilities boast the latest in audiovisual technology, ensuring that every movie is presented with stunning clarity and immersive sound. From the latest blockbusters to timeless classics, our diverse selection of films caters to every taste and preference.<br /><br />
                        As a hub for community entertainment, we take pride in being more than just a cinema.<br />
                        Join us at Cinebh and discover why we're not just your average movie theater - we're your destination for cinematic excellence and entertainment bliss.
                    </p>
                </div>
            </div>

            <img
                src={theaterHall}
                alt='Theater Hall'
                className='w-full h-auto max-h-[60vh] h-object-contain' 
            />

        </div>
    );
}

export default AboutUs;