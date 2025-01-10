import { Helmet} from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';


const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    
    return (
        <div>
              <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <Cover img={menuImg} title="our menu"></Cover>
            {/* mail cover */}

            <SectionTitle
            subHeading="Dont-Miss"
            heading="Today's offers"
            ></SectionTitle>
            {/* offered menu items */}

            <MenuCategory items={offered}></MenuCategory>

            {/* desserts items */}
            <MenuCategory
             items={desserts}
             title={"dessert"}
             coverImg={dessertImg}
            ></MenuCategory>

            {/* pizza items */}

            <MenuCategory
            items={pizza}
            title={"pizza"}
            coverImg={pizzaImg}
            >

            </MenuCategory>

            {/* salad items */}

            <MenuCategory
            items={salad}
            title={"salad"}
            coverImg={saladImg}
            >

            </MenuCategory>

            {/* soup items */}

            <MenuCategory
            items={soup}
            title={"soup"}
            coverImg={soupImg}
            >

            </MenuCategory>
           



        
        </div>
    );
};

export default Menu;