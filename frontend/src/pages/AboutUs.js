import theaterHall from '../assets/denise-jans-the-newbury-boston-fall-theatre.jpg'

function AboutUs() {
    return (
        <div>

            <div className="grid grid-cols-[35%_65%] gap-4 p-12">
                <div></div>
                <h1 className="heading-h1">About Us</h1>
                <div className="flex flex-col">
                    <h5 className="heading-h5">About Our Dream.</h5>
                    <h5 className="heading-h5">Our History.</h5>
                    <h5 className="heading-h5">Cinema.</h5>
                </div>
                <div className="justify-start">
                    <p className="body-regular">
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
                className='w-full max-h-[452px] h-object-contain' 
            />

        </div>
    );
}

export default AboutUs;