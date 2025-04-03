export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <img
              src="/photos/about-me.jpg" // Place your image in the public/photos folder
              alt="About Me"
              className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-gray-100 dark:border-gray-800"
            />
          </div>
          {/* About Content */}
          <div>
            <header className="max-w-3xl mx-auto p-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                About Me: A Journey Through the Lens
              </h1>
              <p className="text-lg mb-6">
                Hi, I'm Matt, and I'm thrilled to welcome you to my world of
                photography. Over the past 10 years, my passion for capturing
                life's beautiful moments has grown into an art form that I am
                excited to share with you. Photography isn't just a hobby or a
                profession for me—it's a way of life, a continuous journey of
                exploration and expression that has allowed me to see the world
                in unique and vibrant ways.
              </p>
            </header>

            <main className="max-w-3xl mx-auto p-6 space-y-8">
              <section id="beginnings">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  My Early Beginnings
                </h2>
                <p className="mb-4">
                  It all started when I was just beginning to understand the
                  magic behind a camera. I still remember the first time I held
                  a camera in my hands—it felt like discovering a secret portal
                  to another dimension. I would take my camera with me wherever
                  I went, eager to capture everything from fleeting moments of
                  everyday life to the striking beauty of nature. Those early
                  days were all about experimentation, learning the
                  fundamentals, and understanding that every picture holds a
                  story waiting to be told.
                </p>
                <p>
                  I practiced relentlessly, and with each click of the shutter,
                  I grew more fascinated with how light, shadow, and perspective
                  could transform a simple scene into a work of art. I wasn't
                  just taking pictures; I was beginning to see the world through
                  a different lens—one where every detail mattered and every
                  moment was an opportunity for creativity.
                </p>
              </section>

              <section id="growth">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  A Decade of Passion and Growth
                </h2>
                <p className="mb-4">
                  Now, after a decade of dedicating myself to photography, I've
                  developed a style that is both personal and evocative. Every
                  photo I take is a reflection of my journey, capturing not just
                  what I see, but also what I feel. Over the years, I've learned
                  that photography is about more than just technical precision;
                  it's about emotion, storytelling, and the connection between
                  the photographer and the subject.
                </p>
                <p>
                  During this time, I've been fortunate to travel to diverse
                  places and meet incredible people, all of which have enriched
                  my perspective and influenced my work. Whether it's the serene
                  calm of a misty morning landscape, the vibrant chaos of a
                  bustling city street, or an intimate portrait that reveals the
                  depth of a person's character, my goal is always to produce
                  images that resonate with my audience. I aim to evoke
                  emotions, stir memories, and inspire a sense of wonder through
                  every picture I create.
                </p>
              </section>

              <section id="philosophy">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  The Philosophy Behind My Work
                </h2>
                <p className="mb-4">
                  For me, photography is a blend of art and science—a beautiful
                  balance between technical expertise and creative expression.
                  Every photograph is carefully composed, with attention paid to
                  elements like lighting, contrast, and framing. Yet, it is the
                  passion behind each shot that truly brings the image to life.
                  I believe that beauty is all around us, often hidden in the
                  mundane, and it's my mission to uncover it.
                </p>
                <p>
                  I strive to create pictures that invite viewers to pause and
                  appreciate the intricate details of life. Whether you're here
                  to admire landscapes, urban scenes, or portraits, I want each
                  image to serve as a window into a moment in time—one that you
                  can interpret and feel in your own unique way.
                </p>
              </section>

              <section id="challenges">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Challenges and Lessons Learned
                </h2>
                <p className="mb-4">
                  The path of a photographer isn't always smooth. There have
                  been times when I faced creative blocks, moments when the
                  perfect shot seemed just out of reach, or when unpredictable
                  weather or technical issues tried to stand in my way. But
                  every challenge has taught me resilience and has pushed me to
                  experiment and innovate. These hurdles have not only honed my
                  technical skills but have also enriched my understanding of
                  art and storytelling.
                </p>
                <p>
                  I've learned that patience is key in photography. Sometimes,
                  it's about waiting for the right light, the perfect moment, or
                  the unrepeatable expression on a subject's face. These
                  experiences have shaped me, teaching me that persistence,
                  curiosity, and a willingness to embrace the unknown are
                  essential ingredients in creating truly compelling images.
                </p>
              </section>

              <section id="creative-process">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  The Creative Process
                </h2>
                <p className="mb-4">
                  My creative process is a blend of spontaneity and careful
                  planning. I believe in the magic of the moment—a fleeting
                  second where everything aligns perfectly—but I also recognize
                  the value of preparation. Whether I'm planning a photoshoot or
                  venturing out with my camera for a spontaneous adventure, I
                  always strive to balance both elements.
                </p>
                <p>
                  When I'm out shooting, I often lose track of time as I immerse
                  myself in the environment, seeking out details that might
                  otherwise go unnoticed. This immersive experience not only
                  helps me capture stunning images but also serves as a form of
                  meditation. It allows me to connect with my surroundings and
                  find inspiration in places that many might overlook.
                </p>
              </section>

              <section id="expectations">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  What You Can Expect
                </h2>
                <p className="mb-4">
                  On this website, you'll find a curated collection of my work,
                  ranging from breathtaking landscapes and dynamic cityscapes to
                  intimate portraits that capture the essence of the human
                  spirit. Every image is a reflection of a moment in time,
                  carefully crafted to tell a story and evoke emotion. I hope
                  that as you explore these galleries, you feel a connection to
                  the stories behind each photograph and that you find
                  inspiration in the beauty of the world around us.
                </p>
                <p>
                  I also share behind-the-scenes insights, tips, and personal
                  anecdotes about my journey as a photographer. Whether you're
                  an aspiring photographer looking for guidance, a seasoned
                  professional seeking inspiration, or simply someone who
                  appreciates the art of photography, there's something here for
                  you. My goal is to build a community where we can share ideas,
                  inspire one another, and celebrate the beauty that surrounds
                  us every day.
                </p>
              </section>

              <section id="future">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  Looking to the Future
                </h2>
                <p className="mb-4">
                  As I look to the future, I am excited about the endless
                  possibilities that photography offers. The world is constantly
                  changing, and with it, new opportunities for creativity arise.
                  I plan to continue exploring new techniques, experimenting
                  with different styles, and pushing the boundaries of what
                  photography can be. There is always something new to learn,
                  and I welcome every challenge as a chance to grow both as an
                  artist and as an individual.
                </p>
                <p>
                  I'm particularly interested in exploring the intersection of
                  technology and art, and how new tools and innovations can
                  enhance the way we capture and experience the world. As
                  digital media continues to evolve, I am committed to staying
                  at the forefront of these changes, ensuring that my work
                  remains fresh, relevant, and engaging.
                </p>
              </section>

              <section id="invitation">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  A Personal Invitation
                </h2>
                <p className="mb-4">
                  Thank you for taking the time to learn a bit about me and my
                  journey. Photography is more than just a career—it's a
                  lifelong passion that continuously shapes who I am. I invite
                  you to explore my portfolio, follow my adventures, and join me
                  in celebrating the art of capturing moments that matter.
                </p>
                <p className="mb-4">
                  I believe that every picture has a story to tell, and I’m
                  excited to share mine with you. Your support and interest mean
                  the world to me, and I hope that my work inspires you to see
                  the beauty in every moment, just as I do every time I pick up
                  my camera.
                </p>
                <p>
                  So, here's to the countless moments waiting to be captured,
                  the stories waiting to be told, and the endless journey of
                  discovery through the lens. Welcome to my world—where every
                  image is a testament to the beauty of life.
                </p>
              </section>
            </main>

            <footer className="max-w-3xl mx-auto p-6 text-center text-gray-600">
              <p>© 2025 Matt's Photography. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
