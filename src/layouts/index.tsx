import { ReactNode } from "react";
import  { Navbar }  from "@/components";

interface Props{
    children: ReactNode
}

const Layout = ({children}: Props) => {
    return(
        <div>
            <Navbar/>

            <div>
                {children}
            </div>
            
            
            
        </div>
    )
}

export default Layout