import { combineReducers } from 'redux'
import CategoryDataChange from './BackendReducers/CategoryReducer'
import BannerDataChange from './BackendReducers/BannerReducer'
import DataChange from './BackendReducers/DataReducer'
import { VariationSizeDataChange, VariationDataChange } from './BackendReducers/VariationReducer'
import ProductDataChange from './BackendReducers/ProductReducer'
import { UserDataChange, ShowUserCartData } from './FrontendReducers/UserReducers'
import CouponDataChange from './FrontendReducers/CopuponReducers'
import { OrderDataChange, OrderDataChangeTrackiD } from './FrontendReducers/OrderReducer'
import MemberShipDataChange from './BackendReducers/MemberShipReducer'
import ProductBannerDataChange from './BackendReducers/ProductBannerReducer'
import AdminDataChange from './AdminReducers/AdminReducer'
import SubCategoryDataChange from './BackendReducers/SubCategoryReducer'
import NewsDataChange from './BackendReducers/NewsReducer'
import ShippingChargeChange from './BackendReducers/ShippingChargeReducer'
import VideoDataChange from './BackendReducers/PostVideoReducer'
import NottiflyDataChange from './BackendReducers/NottiflyReducer'
import HomeFeatureDataChange from './BackendReducers/HomeFeaturesReducer'
import OffersDataChange from './BackendReducers/OffersReducer'
import ColorDataChange from './BackendReducers/ColorReducer'
import SizeDataChange from './BackendReducers/SizeReducer'


const rootReducer = combineReducers({
    CategoryDataChange,
    SubCategoryDataChange,
    BannerDataChange,
    DataChange,
    ProductDataChange,
    VariationDataChange,
    VariationSizeDataChange,
    UserDataChange,
    ShowUserCartData,
    CouponDataChange,
    OrderDataChange,
    OrderDataChangeTrackiD,
    MemberShipDataChange,
    ProductBannerDataChange,
    AdminDataChange,
    NewsDataChange,
    ShippingChargeChange,
    VideoDataChange,
    NottiflyDataChange,
    HomeFeatureDataChange,
    OffersDataChange,
    ColorDataChange,
    SizeDataChange
})

export default rootReducer

