import { colors } from "../../theme/colors"
import { typography } from "../../theme/typography"

export const BASE = {
    fontFamily: typography.primary,
}

export const BASE_BOLD = {
    fontFamily: typography.medium,
}   

export const BOLD = {
    fontFamily:typography.bold,
}

export const presets = {
    default: typography.primary,
    bold: BOLD,
    // used for big headings like shop name, page heading
    h1: {
        ...BOLD,
        fontSize: 32
    },
    h2:{

        ...BOLD,
    
        fontSize:28
    
    },
    // used for catagory text 
    catagory: {
        ...BASE_BOLD,
        fontSize: 24
    },
    // used for service name / notifcation title /
    title: {
        ...BOLD,
        fontSize: 20
    },
    h5:{

        ...BASE_BOLD,
    
        fontSize:18
    
    },
    h6:{

        ...BASE_BOLD,
    
        fontSize:16
    
    },
    
    small:{
    
        ...BASE,
    
    fontSize:12
    
    },
    // used for gray text
    info: {
        ...BASE_BOLD,
        fontSize: 18,
        color: colors.gray
    },
}