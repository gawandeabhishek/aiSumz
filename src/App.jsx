import Hero from "./components/Hero"
import Demo from "./components/Demo"

const App = () => {
  return (
    <main className="transition-all px-10 md:px-20 bg-gradient-to-tl from-sky-100/20 to-sky-50/10">
      <Hero />
      <Demo />
    </main>
  )
}

export default App