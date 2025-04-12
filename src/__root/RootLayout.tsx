import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <Header />
        <div className="">
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default RootLayout
