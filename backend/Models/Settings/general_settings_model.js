const mongoose = require('mongoose');

const GeneralSettingSchema = mongoose.Schema({
    app_name: String,
    app_author: String,
    app_logo: String,
    app_upi_image: String,
    app_contact: String,
    app_whatsapp: String,
    app_res_whatsapp: String,
    app_wall_whatsapp: String,
    app_trans_charge: Number,
    app_pick_store_address: String,
    app_lat: String,
    app_lng: String,
    app_soc_youtube: String,
    app_soc_telegram: String,
    app_soc_instagram: String,
    app_soc_faceboook: String,
    app_upi_id: String,
    app_email: String,
    app_website: String,
    app_description: String,
    app_developed_by: String,
    app_privacy_policy: String,
    app_return_refund_policy: String,
    app_cod_policy: String,
    app_terms_condition: String,
    app_cancellation_refund: String,
    app_about_us: String,
    app_contact_us: String,
    app_faq: String,
    min_order: String,
    delivery_charge: String,
    min_delivery_free: String,
    onesignal_app_id: String,
    onesignal_rest_key: String,
    app_version: String,
    app_maintenance_status: {
        type: Boolean,
        default: false
    },
    app_maintenance_description: String,
    app_update_description: String,
    app_update_cancel_button: {
        type: Boolean,
        default: false
    },
    order_coins_reward: {
        type: Number,
        default: 0
    },
    reference_coins_reward: {
        type: Number,
        default: 0
    },
    reference_wallet_reward: {
        type: Number,
        default: 0
    },
    factor_apikey: String,
    app_update_factor_button: {
        type: Boolean,
        default: false
    },
    firebase_server_key: String,
    razorpay_key: String,
    map_api_key: String,
    cash_on_delivery_available: String,
    coin_withdrawal_limit: Number,
    min_wallet_amount_limit: Number,
    price_convert_coin: Number,
    gst_charge: String,
    address: String,
    pan_no: String,
    gst_no: String,
    bank_name: String,
    account_no: String,
    ifsc_code: String,
    branch_name: String,
    review_reward_amount: Number,
    min_amount_wallet_for_order: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('GeneralSettings', GeneralSettingSchema);
