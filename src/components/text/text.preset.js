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
    // used for gray text
    info: {
        ...BASE_BOLD,
        fontSize: 18,
        color: colors.gray
    },
}