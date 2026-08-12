const navbar = document.getElementById("navbar");

function handleScroll()
{
    console.log(window.scrollY);
    
    if(window.scrollY > 20)
    {
        navbar.classList.add("sticky");
    }
    else
    {
        navbar.classList.remove("sticky");
    }
}

window.addEventListener("scroll", handleScroll);