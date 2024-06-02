import {v4 as uuid} from 'uuid'

// Object Mapping to clean up menu items before being passed into component

export const mapMainMenuItems = (menuItems) => {
    menuItems.map((menuItems) => {
        (menuItems.items || []).map((subMenuItem) => {
            console.log(subMenuItem)
        })
    })
    return menuItems.map(menuItem => ({
        id: uuid(),
        destination: menuItem.menuItem.destination?.uri,
        label: menuItem.menuItem.label,
        subMenuItem: (menuItem.items || []).map((subMenuItem => ({
            id: uuid(),
            destination: subMenuItem.destination?.uri,
            label: subMenuItem.label,
            subLabel: subMenuItem.subLabel,
            icon: subMenuItem?.icon?.mediaItemUrl || ""
        })))
    }))
}   