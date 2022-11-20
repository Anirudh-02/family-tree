import { useState } from "react";
import { useEffect } from "react";

export default function useContextMenu() {
    const [showMenu, setShowMenu] = useState(false)
    const [menuX, setMenuX] = useState(null)
    const [menuY, setMenuY] = useState(null)
    
    useEffect(() => {
        document.addEventListener('click', (e) => {
            showMenu ? setShowMenu(false) : null
        }, [])

        return () => document.removeEventListener('click', (e) => {
            setMenuX(e.target.pageX) 
            setMenuY(e.target.pageY) 
            showMenu ? setShowMenu(false) : null
        })
    })

    return [showMenu, menuX, menuY, setShowMenu, setMenuX, setMenuY]
}