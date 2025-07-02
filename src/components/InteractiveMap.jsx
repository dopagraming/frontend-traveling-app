import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Zap, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../lib/axios";

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Coordinate mapping for major destinations
  const coordinateMap = {
    // Egypt
    cairo: { lat: 30.0444, lng: 31.2357 },
    giza: { lat: 29.9773, lng: 31.1325 },
    luxor: { lat: 25.6872, lng: 32.6396 },
    aswan: { lat: 24.0889, lng: 32.8998 },
    alexandria: { lat: 31.2001, lng: 29.9187 },
    hurghada: { lat: 27.2579, lng: 33.8116 },
    "sharm el sheikh": { lat: 27.9158, lng: 34.33 },
    egypt: { lat: 26.8206, lng: 30.8025 },

    // UAE
    dubai: { lat: 25.2048, lng: 55.2708 },
    "abu dhabi": { lat: 24.4539, lng: 54.3773 },
    uae: { lat: 23.4241, lng: 53.8478 },

    // Popular destinations
    paris: { lat: 48.8566, lng: 2.3522 },
    london: { lat: 51.5074, lng: -0.1278 },
    tokyo: { lat: 35.6762, lng: 139.6503 },
    "new york": { lat: 40.7128, lng: -74.006 },
    sydney: { lat: -33.8688, lng: 151.2093 },
    rome: { lat: 41.9028, lng: 12.4964 },
    barcelona: { lat: 41.3851, lng: 2.1734 },
    istanbul: { lat: 41.0082, lng: 28.9784 },
    bangkok: { lat: 13.7563, lng: 100.5018 },
    singapore: { lat: 1.3521, lng: 103.8198 },
    "hong kong": { lat: 22.3193, lng: 114.1694 },
    "los angeles": { lat: 34.0522, lng: -118.2437 },
    miami: { lat: 25.7617, lng: -80.1918 },
    "las vegas": { lat: 36.1699, lng: -115.1398 },
    amsterdam: { lat: 52.3676, lng: 4.9041 },
    berlin: { lat: 52.52, lng: 13.405 },
    madrid: { lat: 40.4168, lng: -3.7038 },
    lisbon: { lat: 38.7223, lng: -9.1393 },
    prague: { lat: 50.0755, lng: 14.4378 },
    vienna: { lat: 48.2082, lng: 16.3738 },
    zurich: { lat: 47.3769, lng: 8.5417 },
    stockholm: { lat: 59.3293, lng: 18.0686 },
    oslo: { lat: 59.9139, lng: 10.7522 },
    copenhagen: { lat: 55.6761, lng: 12.5683 },
    helsinki: { lat: 60.1699, lng: 24.9384 },
    moscow: { lat: 55.7558, lng: 37.6176 },
    "st petersburg": { lat: 59.9311, lng: 30.3609 },
    beijing: { lat: 39.9042, lng: 116.4074 },
    shanghai: { lat: 31.2304, lng: 121.4737 },
    seoul: { lat: 37.5665, lng: 126.978 },
    osaka: { lat: 34.6937, lng: 135.5023 },
    kyoto: { lat: 35.0116, lng: 135.7681 },
    mumbai: { lat: 19.076, lng: 72.8777 },
    delhi: { lat: 28.7041, lng: 77.1025 },
    bangalore: { lat: 12.9716, lng: 77.5946 },
    kolkata: { lat: 22.5726, lng: 88.3639 },
    chennai: { lat: 13.0827, lng: 80.2707 },
    hyderabad: { lat: 17.385, lng: 78.4867 },
    pune: { lat: 18.5204, lng: 73.8567 },
    jaipur: { lat: 26.9124, lng: 75.7873 },
    agra: { lat: 27.1767, lng: 78.0081 },
    goa: { lat: 15.2993, lng: 74.124 },
    kerala: { lat: 10.8505, lng: 76.2711 },
    rajasthan: { lat: 27.0238, lng: 74.2179 },
    kashmir: { lat: 34.0837, lng: 74.7973 },
    "himachal pradesh": { lat: 31.1048, lng: 77.1734 },
    uttarakhand: { lat: 30.0668, lng: 79.0193 },
    karnataka: { lat: 15.3173, lng: 75.7139 },
    "tamil nadu": { lat: 11.1271, lng: 78.6569 },
    "andhra pradesh": { lat: 15.9129, lng: 79.74 },
    telangana: { lat: 18.1124, lng: 79.0193 },
    "west bengal": { lat: 22.9868, lng: 87.855 },
    odisha: { lat: 20.9517, lng: 85.0985 },
    bihar: { lat: 25.0961, lng: 85.3131 },
    jharkhand: { lat: 23.6102, lng: 85.2799 },
    chhattisgarh: { lat: 21.2787, lng: 81.8661 },
    "madhya pradesh": { lat: 22.9734, lng: 78.6569 },
    gujarat: { lat: 22.2587, lng: 71.1924 },
    maharashtra: { lat: 19.7515, lng: 75.7139 },
    punjab: { lat: 31.1471, lng: 75.3412 },
    haryana: { lat: 29.0588, lng: 76.0856 },
    "uttar pradesh": { lat: 26.8467, lng: 80.9462 },
    assam: { lat: 26.2006, lng: 92.9376 },
    meghalaya: { lat: 25.467, lng: 91.3662 },
    manipur: { lat: 24.6637, lng: 93.9063 },
    mizoram: { lat: 23.1645, lng: 92.9376 },
    nagaland: { lat: 26.1584, lng: 94.5624 },
    tripura: { lat: 23.9408, lng: 91.9882 },
    "arunachal pradesh": { lat: 28.218, lng: 94.7278 },
    sikkim: { lat: 27.533, lng: 88.5122 },

    // Countries
    india: { lat: 20.5937, lng: 78.9629 },
    china: { lat: 35.8617, lng: 104.1954 },
    japan: { lat: 36.2048, lng: 138.2529 },
    "south korea": { lat: 35.9078, lng: 127.7669 },
    thailand: { lat: 15.87, lng: 100.9925 },
    vietnam: { lat: 14.0583, lng: 108.2772 },
    cambodia: { lat: 12.5657, lng: 104.991 },
    laos: { lat: 19.8563, lng: 102.4955 },
    myanmar: { lat: 21.9162, lng: 95.956 },
    malaysia: { lat: 4.2105, lng: 101.9758 },
    indonesia: { lat: -0.7893, lng: 113.9213 },
    philippines: { lat: 12.8797, lng: 121.774 },
    australia: { lat: -25.2744, lng: 133.7751 },
    "new zealand": { lat: -40.9006, lng: 174.886 },
    canada: { lat: 56.1304, lng: -106.3468 },
    usa: { lat: 37.0902, lng: -95.7129 },
    mexico: { lat: 23.6345, lng: -102.5528 },
    brazil: { lat: -14.235, lng: -51.9253 },
    argentina: { lat: -38.4161, lng: -63.6167 },
    chile: { lat: -35.6751, lng: -71.543 },
    peru: { lat: -9.19, lng: -75.0152 },
    colombia: { lat: 4.5709, lng: -74.2973 },
    venezuela: { lat: 6.4238, lng: -66.5897 },
    ecuador: { lat: -1.8312, lng: -78.1834 },
    bolivia: { lat: -16.2902, lng: -63.5887 },
    paraguay: { lat: -23.4425, lng: -58.4438 },
    uruguay: { lat: -32.5228, lng: -55.7658 },
    guyana: { lat: 4.8604, lng: -58.9302 },
    suriname: { lat: 3.9193, lng: -56.0278 },
    "french guiana": { lat: 3.9339, lng: -53.1258 },
    "falkland islands": { lat: -51.7963, lng: -59.5236 },
    "south georgia": { lat: -54.4296, lng: -36.5879 },
    antarctica: { lat: -82.8628, lng: 135.0 },
    greenland: { lat: 71.7069, lng: -42.6043 },
    iceland: { lat: 64.9631, lng: -19.0208 },
    "faroe islands": { lat: 61.8926, lng: -6.9118 },
    svalbard: { lat: 77.5536, lng: 23.6703 },
    "jan mayen": { lat: 70.9955, lng: -8.5019 },
    "bouvet island": { lat: -54.4208, lng: 3.3464 },
    "heard island": { lat: -53.1089, lng: 73.5092 },
    "macquarie island": { lat: -54.62, lng: 158.854 },
    "south sandwich islands": { lat: -57.75, lng: -26.5 },
    "peter i island": { lat: -68.75, lng: -90.5833 },
    "scott island": { lat: -67.4, lng: -179.9167 },
    "balleny islands": { lat: -66.9167, lng: 163.25 },
    france: { lat: 46.6034, lng: 1.8883 },
    germany: { lat: 51.1657, lng: 10.4515 },
    italy: { lat: 41.8719, lng: 12.5674 },
    spain: { lat: 40.4637, lng: -3.7492 },
    portugal: { lat: 39.3999, lng: -8.2245 },
    "united kingdom": { lat: 55.3781, lng: -3.436 },
    ireland: { lat: 53.4129, lng: -8.2439 },
    netherlands: { lat: 52.1326, lng: 5.2913 },
    belgium: { lat: 50.5039, lng: 4.4699 },
    luxembourg: { lat: 49.8153, lng: 6.1296 },
    switzerland: { lat: 46.8182, lng: 8.2275 },
    austria: { lat: 47.5162, lng: 14.5501 },
    "czech republic": { lat: 49.8175, lng: 15.473 },
    slovakia: { lat: 48.669, lng: 19.699 },
    poland: { lat: 51.9194, lng: 19.1451 },
    hungary: { lat: 47.1625, lng: 19.5033 },
    romania: { lat: 45.9432, lng: 24.9668 },
    bulgaria: { lat: 42.7339, lng: 25.4858 },
    greece: { lat: 39.0742, lng: 21.8243 },
    albania: { lat: 41.1533, lng: 20.1683 },
    montenegro: { lat: 42.7087, lng: 19.3744 },
    "bosnia and herzegovina": { lat: 43.9159, lng: 17.6791 },
    serbia: { lat: 44.0165, lng: 21.0059 },
    croatia: { lat: 45.1, lng: 15.2 },
    slovenia: { lat: 46.1512, lng: 14.9955 },
    "north macedonia": { lat: 41.6086, lng: 21.7453 },
    kosovo: { lat: 42.6026, lng: 20.903 },
    moldova: { lat: 47.4116, lng: 28.3699 },
    ukraine: { lat: 48.3794, lng: 31.1656 },
    belarus: { lat: 53.7098, lng: 27.9534 },
    lithuania: { lat: 55.1694, lng: 23.8813 },
    latvia: { lat: 56.8796, lng: 24.6032 },
    estonia: { lat: 58.5953, lng: 25.0136 },
    finland: { lat: 61.9241, lng: 25.7482 },
    sweden: { lat: 60.1282, lng: 18.6435 },
    norway: { lat: 60.472, lng: 8.4689 },
    denmark: { lat: 56.2639, lng: 9.5018 },
    russia: { lat: 61.524, lng: 105.3188 },
    turkey: { lat: 38.9637, lng: 35.2433 },
    cyprus: { lat: 35.1264, lng: 33.4299 },
    malta: { lat: 35.9375, lng: 14.3754 },
    "san marino": { lat: 43.9424, lng: 12.4578 },
    "vatican city": { lat: 41.9029, lng: 12.4534 },
    monaco: { lat: 43.7384, lng: 7.4246 },
    andorra: { lat: 42.5063, lng: 1.5218 },
    liechtenstein: { lat: 47.166, lng: 9.5554 },
    morocco: { lat: 31.7917, lng: -7.0926 },
    algeria: { lat: 28.0339, lng: 1.6596 },
    tunisia: { lat: 33.8869, lng: 9.5375 },
    libya: { lat: 26.3351, lng: 17.2283 },
    sudan: { lat: 12.8628, lng: 30.2176 },
    "south sudan": { lat: 6.877, lng: 31.307 },
    ethiopia: { lat: 9.145, lng: 40.4897 },
    eritrea: { lat: 15.1794, lng: 39.7823 },
    djibouti: { lat: 11.8251, lng: 42.5903 },
    somalia: { lat: 5.1521, lng: 46.1996 },
    kenya: { lat: -0.0236, lng: 37.9062 },
    uganda: { lat: 1.3733, lng: 32.2903 },
    tanzania: { lat: -6.369, lng: 34.8888 },
    rwanda: { lat: -1.9403, lng: 29.8739 },
    burundi: { lat: -3.3731, lng: 29.9189 },
    "democratic republic of congo": { lat: -4.0383, lng: 21.7587 },
    "central african republic": { lat: 6.6111, lng: 20.9394 },
    chad: { lat: 15.4542, lng: 18.7322 },
    cameroon: { lat: 7.3697, lng: 12.3547 },
    "equatorial guinea": { lat: 1.6508, lng: 10.2679 },
    gabon: { lat: -0.8037, lng: 11.6094 },
    "republic of congo": { lat: -0.228, lng: 15.8277 },
    angola: { lat: -11.2027, lng: 17.8739 },
    zambia: { lat: -13.1339, lng: 27.8493 },
    malawi: { lat: -13.2543, lng: 34.3015 },
    mozambique: { lat: -18.6657, lng: 35.5296 },
    zimbabwe: { lat: -19.0154, lng: 29.1549 },
    botswana: { lat: -22.3285, lng: 24.6849 },
    namibia: { lat: -22.9576, lng: 18.4904 },
    "south africa": { lat: -30.5595, lng: 22.9375 },
    lesotho: { lat: -29.61, lng: 28.2336 },
    swaziland: { lat: -26.5225, lng: 31.4659 },
    madagascar: { lat: -18.7669, lng: 46.8691 },
    mauritius: { lat: -20.3484, lng: 57.5522 },
    seychelles: { lat: -4.6796, lng: 55.492 },
    comoros: { lat: -11.6455, lng: 43.3333 },
    mayotte: { lat: -12.8275, lng: 45.1662 },
    reunion: { lat: -21.1151, lng: 55.5364 },
    "saint helena": { lat: -15.9387, lng: -5.7197 },
    "ascension island": { lat: -7.9467, lng: -14.3559 },
    "tristan da cunha": { lat: -37.0662, lng: -12.2777 },
    "cape verde": { lat: 16.5388, lng: -24.0132 },
    "sao tome and principe": { lat: 0.1864, lng: 6.6131 },
    "guinea-bissau": { lat: 11.8037, lng: -15.1804 },
    guinea: { lat: 9.9456, lng: -9.6966 },
    "sierra leone": { lat: 8.4606, lng: -11.7799 },
    liberia: { lat: 6.4281, lng: -9.4295 },
    "ivory coast": { lat: 7.54, lng: -5.5471 },
    ghana: { lat: 7.9465, lng: -1.0232 },
    togo: { lat: 8.6195, lng: 0.8248 },
    benin: { lat: 9.3077, lng: 2.3158 },
    nigeria: { lat: 9.082, lng: 8.6753 },
    niger: { lat: 17.6078, lng: 8.0817 },
    "burkina faso": { lat: 12.2383, lng: -1.5616 },
    mali: { lat: 17.5707, lng: -3.9962 },
    senegal: { lat: 14.4974, lng: -14.4524 },
    gambia: { lat: 13.4432, lng: -15.3101 },
    mauritania: { lat: 21.0079, lng: -10.9408 },
    "western sahara": { lat: 24.2155, lng: -12.8858 },
    "canary islands": { lat: 28.2916, lng: -16.6291 },
    madeira: { lat: 32.7607, lng: -16.9595 },
    azores: { lat: 37.7412, lng: -25.6756 },
    maldives: { lat: 3.2028, lng: 73.2207 },
    "sri lanka": { lat: 7.8731, lng: 80.7718 },
    bangladesh: { lat: 23.685, lng: 90.3563 },
    bhutan: { lat: 27.5142, lng: 90.4336 },
    nepal: { lat: 28.3949, lng: 84.124 },
    pakistan: { lat: 30.3753, lng: 69.3451 },
    afghanistan: { lat: 33.9391, lng: 67.71 },
    iran: { lat: 32.4279, lng: 53.688 },
    iraq: { lat: 33.2232, lng: 43.6793 },
    syria: { lat: 34.8021, lng: 38.9968 },
    lebanon: { lat: 33.8547, lng: 35.8623 },
    jordan: { lat: 30.5852, lng: 36.2384 },
    israel: { lat: 31.0461, lng: 34.8516 },
    palestine: { lat: 31.9522, lng: 35.2332 },
    "saudi arabia": { lat: 23.8859, lng: 45.0792 },
    yemen: { lat: 15.5527, lng: 48.5164 },
    oman: { lat: 21.4735, lng: 55.9754 },
    qatar: { lat: 25.3548, lng: 51.1839 },
    bahrain: { lat: 25.9304, lng: 50.6378 },
    kuwait: { lat: 29.3117, lng: 47.4818 },
    "united arab emirates": { lat: 23.4241, lng: 53.8478 },
    georgia: { lat: 42.3154, lng: 43.3569 },
    armenia: { lat: 40.0691, lng: 45.0382 },
    azerbaijan: { lat: 40.1431, lng: 47.5769 },
    kazakhstan: { lat: 48.0196, lng: 66.9237 },
    kyrgyzstan: { lat: 41.2044, lng: 74.7661 },
    tajikistan: { lat: 38.861, lng: 71.2761 },
    turkmenistan: { lat: 38.9697, lng: 59.5563 },
    uzbekistan: { lat: 41.3775, lng: 64.5853 },
    mongolia: { lat: 46.8625, lng: 103.8467 },
    "north korea": { lat: 40.3399, lng: 127.5101 },
    taiwan: { lat: 23.6978, lng: 120.9605 },
    macau: { lat: 22.1987, lng: 113.5439 },
    brunei: { lat: 4.5353, lng: 114.7277 },
    "east timor": { lat: -8.8742, lng: 125.7275 },
    "papua new guinea": { lat: -6.315, lng: 143.9555 },
    "solomon islands": { lat: -9.6457, lng: 160.1562 },
    vanuatu: { lat: -15.3767, lng: 166.9592 },
    fiji: { lat: -16.578, lng: 179.4144 },
    "new caledonia": { lat: -20.9043, lng: 165.618 },
    samoa: { lat: -13.759, lng: -172.1046 },
    "american samoa": { lat: -14.271, lng: -170.1322 },
    tonga: { lat: -21.1789, lng: -175.1982 },
    niue: { lat: -19.0544, lng: -169.8672 },
    "cook islands": { lat: -21.2367, lng: -159.7777 },
    "french polynesia": { lat: -17.6797, lng: -149.4068 },
    "pitcairn islands": { lat: -24.7036, lng: -127.4393 },
    tokelau: { lat: -8.9672, lng: -171.8555 },
    "wallis and futuna": { lat: -13.7687, lng: -177.1562 },
    kiribati: { lat: -3.3704, lng: -168.734 },
    tuvalu: { lat: -7.1095, lng: 177.6493 },
    nauru: { lat: -0.5228, lng: 166.9315 },
    "marshall islands": { lat: 7.1315, lng: 171.1845 },
    micronesia: { lat: 7.4256, lng: 150.5508 },
    palau: { lat: 7.515, lng: 134.5825 },
    guam: { lat: 13.4443, lng: 144.7937 },
    "northern mariana islands": { lat: 17.3308, lng: 145.3846 },
    "wake island": { lat: 19.2823, lng: 166.6503 },
    "midway atoll": { lat: 28.2072, lng: -177.3735 },
    "johnston atoll": { lat: 16.7295, lng: -169.5336 },
    "palmyra atoll": { lat: 5.8885, lng: -162.0786 },
    "kingman reef": { lat: 6.3833, lng: -162.4167 },
    "jarvis island": { lat: -0.3742, lng: -160.0187 },
    "baker island": { lat: 0.1936, lng: -176.4769 },
    "howland island": { lat: 0.8113, lng: -176.6183 },
    "navassa island": { lat: 18.4017, lng: -75.0158 },
    "bajo nuevo bank": { lat: 15.8667, lng: -78.65 },
    "serranilla bank": { lat: 15.8, lng: -79.85 },
    "costa rica": { lat: 9.7489, lng: -83.7534 },
    panama: { lat: 8.538, lng: -80.7821 },
    nicaragua: { lat: 12.265, lng: -85.2072 },
    honduras: { lat: 15.2, lng: -86.2419 },
    "el salvador": { lat: 13.7942, lng: -88.8965 },
    guatemala: { lat: 15.7835, lng: -90.2308 },
    belize: { lat: 17.1899, lng: -88.4976 },
    jamaica: { lat: 18.1096, lng: -77.2975 },
    haiti: { lat: 18.9712, lng: -72.2852 },
    "dominican republic": { lat: 18.7357, lng: -70.1627 },
    "puerto rico": { lat: 18.2208, lng: -66.5901 },
    "virgin islands": { lat: 18.3358, lng: -64.8963 },
    "british virgin islands": { lat: 18.4207, lng: -64.6399 },
    anguilla: { lat: 18.2206, lng: -63.0686 },
    "saint martin": { lat: 18.0708, lng: -63.0501 },
    "saint barthelemy": { lat: 17.9, lng: -62.8333 },
    saba: { lat: 17.6361, lng: -63.2322 },
    "sint eustatius": { lat: 17.4893, lng: -62.9738 },
    "sint maarten": { lat: 18.0425, lng: -63.0548 },
    "antigua and barbuda": { lat: 17.0608, lng: -61.7964 },
    montserrat: { lat: 16.7425, lng: -62.1874 },
    guadeloupe: { lat: 16.995, lng: -62.0674 },
    dominica: { lat: 15.415, lng: -61.371 },
    martinique: { lat: 14.6415, lng: -61.0242 },
    "saint lucia": { lat: 13.9094, lng: -60.9789 },
    "saint vincent and the grenadines": { lat: 12.9843, lng: -61.2872 },
    barbados: { lat: 13.1939, lng: -59.5432 },
    grenada: { lat: 12.1165, lng: -61.679 },
    "trinidad and tobago": { lat: 10.6918, lng: -61.2225 },
    aruba: { lat: 12.5211, lng: -69.9683 },
    curacao: { lat: 12.1696, lng: -68.99 },
    bonaire: { lat: 12.1784, lng: -68.2385 },
    "saint kitts and nevis": { lat: 17.3578, lng: -62.783 },
    "turks and caicos islands": { lat: 21.694, lng: -71.7979 },
    "cayman islands": { lat: 19.3133, lng: -81.2546 },
    cuba: { lat: 21.5218, lng: -77.7812 },
    bahamas: { lat: 25.0343, lng: -77.3963 },
    bermuda: { lat: 32.3078, lng: -64.7505 },
    "saint pierre and miquelon": { lat: 46.8852, lng: -56.3159 },
    alaska: { lat: 61.2181, lng: -149.9003 },
    hawaii: { lat: 21.0943, lng: -157.4983 },
    "puerto rico": { lat: 18.2208, lng: -66.5901 },
    "us virgin islands": { lat: 18.3358, lng: -64.8963 },
    "american samoa": { lat: -14.271, lng: -170.1322 },
    guam: { lat: 13.4443, lng: 144.7937 },
    "northern mariana islands": { lat: 17.3308, lng: 145.3846 },
    "puerto rico": { lat: 18.2208, lng: -66.5901 },
    "us virgin islands": { lat: 18.3358, lng: -64.8963 },
    "american samoa": { lat: -14.271, lng: -170.1322 },
    guam: { lat: 13.4443, lng: 144.7937 },
    "northern mariana islands": { lat: 17.3308, lng: 145.3846 },
    "puerto rico": { lat: 18.2208, lng: -66.5901 },
    "us virgin islands": { lat: 18.3358, lng: -64.8963 },
    "american samoa": { lat: -14.271, lng: -170.1322 },
    guam: { lat: 13.4443, lng: 144.7937 },
    "northern mariana islands": { lat: 17.3308, lng: 145.3846 },
  };

  // Emoji mapping for destinations
  const getDestinationEmoji = (destination) => {
    const dest = destination?.toLowerCase();
    const emojiMap = {
      egypt: "🏺",
      cairo: "🏺",
      giza: "🏺",
      luxor: "🏺",
      aswan: "🏺",
      dubai: "🏙️",
      uae: "🏙️",
      "abu dhabi": "🏙️",
      paris: "🗼",
      france: "🗼",
      london: "🏰",
      "united kingdom": "🏰",
      uk: "🏰",
      tokyo: "🏯",
      japan: "🏯",
      kyoto: "🏯",
      osaka: "🏯",
      "new york": "🗽",
      usa: "🗽",
      america: "🗽",
      sydney: "🌉",
      australia: "🌉",
      rome: "🏛️",
      italy: "🏛️",
      barcelona: "🏖️",
      spain: "🏖️",
      madrid: "🏖️",
      istanbul: "🕌",
      turkey: "🕌",
      bangkok: "🛕",
      thailand: "🛕",
      singapore: "🏙️",
      "hong kong": "🏙️",
      maldives: "🏝️",
      bali: "🌺",
      indonesia: "🌺",
      greece: "🏛️",
      athens: "🏛️",
      morocco: "🕌",
      marrakech: "🕌",
      india: "🕌",
      mumbai: "🕌",
      delhi: "🕌",
      china: "🏯",
      beijing: "🏯",
      shanghai: "🏯",
      brazil: "🏖️",
      "rio de janeiro": "🏖️",
      mexico: "🌮",
      cancun: "🌮",
      peru: "🏔️",
      "machu picchu": "🏔️",
      nepal: "🏔️",
      himalayas: "🏔️",
      iceland: "🌋",
      norway: "🏔️",
      switzerland: "🏔️",
      canada: "🍁",
      "south africa": "🦁",
      kenya: "🦁",
      tanzania: "🦁",
      madagascar: "🐒",
      "costa rica": "🦜",
      chile: "🏔️",
      argentina: "🥩",
      russia: "🏰",
      "south korea": "🏯",
      vietnam: "🍜",
      cambodia: "🛕",
      myanmar: "🛕",
      "sri lanka": "🐘",
      philippines: "🏝️",
      malaysia: "🏙️",
      "new zealand": "🐑",
      fiji: "🏝️",
      tahiti: "🏝️",
      seychelles: "🏝️",
      mauritius: "🏝️",
      jordan: "🏜️",
      israel: "🕊️",
      lebanon: "🌲",
      oman: "🏜️",
      qatar: "🏙️",
      bahrain: "🏙️",
      kuwait: "🏙️",
      "saudi arabia": "🕌",
      yemen: "🏜️",
      iran: "🕌",
      iraq: "🏜️",
      syria: "🏜️",
      afghanistan: "🏔️",
      pakistan: "🏔️",
      bangladesh: "🐅",
      bhutan: "🏔️",
      mongolia: "🐎",
      "north korea": "🏯",
      taiwan: "🏙️",
      macau: "🎰",
      brunei: "🕌",
      "east timor": "🏝️",
      "papua new guinea": "🦜",
      "solomon islands": "🏝️",
      vanuatu: "🌋",
      samoa: "🏝️",
      tonga: "🏝️",
      "cook islands": "🏝️",
      "french polynesia": "🏝️",
      kiribati: "🏝️",
      tuvalu: "🏝️",
      nauru: "🏝️",
      "marshall islands": "🏝️",
      micronesia: "🏝️",
      palau: "🏝️",
      guam: "🏝️",
      "northern mariana islands": "🏝️",
      "american samoa": "🏝️",
      hawaii: "🌺",
      alaska: "🐻",
      "puerto rico": "🏝️",
      "virgin islands": "🏝️",
      jamaica: "🏝️",
      haiti: "🏝️",
      "dominican republic": "🏝️",
      cuba: "🏝️",
      bahamas: "🏝️",
      bermuda: "🏝️",
      barbados: "🏝️",
      "trinidad and tobago": "🏝️",
      aruba: "🏝️",
      curacao: "🏝️",
      bonaire: "🏝️",
      "saint lucia": "🏝️",
      grenada: "🏝️",
      "saint vincent and the grenadines": "🏝️",
      "antigua and barbuda": "🏝️",
      "saint kitts and nevis": "🏝️",
      dominica: "🏝️",
      martinique: "🏝️",
      guadeloupe: "🏝️",
      "saint martin": "🏝️",
      "saint barthelemy": "🏝️",
      anguilla: "🏝️",
      "british virgin islands": "🏝️",
      "turks and caicos islands": "🏝️",
      "cayman islands": "🏝️",
      montserrat: "🏝️",
      saba: "🏝️",
      "sint eustatius": "🏝️",
      "sint maarten": "🏝️",
      belize: "🏝️",
      guatemala: "🌋",
      "el salvador": "🌋",
      honduras: "🏔️",
      nicaragua: "🌋",
      panama: "🌴",
      colombia: "☕",
      venezuela: "🏔️",
      guyana: "🌴",
      suriname: "🌴",
      "french guiana": "🌴",
      ecuador: "🌋",
      bolivia: "🏔️",
      paraguay: "🌾",
      uruguay: "🥩",
      "falkland islands": "🐧",
      "south georgia": "🐧",
      antarctica: "🐧",
      greenland: "🧊",
      "faroe islands": "🐑",
      svalbard: "🐻‍❄️",
      "jan mayen": "🧊",
      "bouvet island": "🐧",
      "heard island": "🐧",
      "macquarie island": "🐧",
      "south sandwich islands": "🐧",
      "peter i island": "🐧",
      "scott island": "🐧",
      "balleny islands": "🐧",
      germany: "🏰",
      netherlands: "🌷",
      belgium: "🍫",
      luxembourg: "🏰",
      austria: "🏔️",
      "czech republic": "🏰",
      slovakia: "🏰",
      poland: "🏰",
      hungary: "🏰",
      romania: "🏰",
      bulgaria: "🏔️",
      albania: "🏔️",
      montenegro: "🏔️",
      "bosnia and herzegovina": "🏔️",
      serbia: "🏔️",
      croatia: "🏖️",
      slovenia: "🏔️",
      "north macedonia": "🏔️",
      kosovo: "🏔️",
      moldova: "🍇",
      ukraine: "🌻",
      belarus: "🌲",
      lithuania: "🏰",
      latvia: "🏰",
      estonia: "🏰",
      finland: "🌲",
      sweden: "🌲",
      denmark: "🏰",
      cyprus: "🏖️",
      malta: "🏰",
      "san marino": "🏰",
      "vatican city": "⛪",
      monaco: "🎰",
      andorra: "🏔️",
      liechtenstein: "🏔️",
      algeria: "🏜️",
      tunisia: "🏜️",
      libya: "🏜️",
      sudan: "🏜️",
      "south sudan": "🦁",
      ethiopia: "☕",
      eritrea: "🏜️",
      djibouti: "🏜️",
      somalia: "🐪",
      uganda: "🦍",
      rwanda: "🦍",
      burundi: "🦍",
      "democratic republic of congo": "🦍",
      "central african republic": "🐘",
      chad: "🏜️",
      cameroon: "🦍",
      "equatorial guinea": "🦍",
      gabon: "🦍",
      "republic of congo": "🦍",
      angola: "🐘",
      zambia: "🐘",
      malawi: "🐘",
      mozambique: "🐘",
      zimbabwe: "🐘",
      botswana: "🐘",
      namibia: "🏜️",
      lesotho: "🏔️",
      swaziland: "🦏",
      "cape verde": "🏝️",
      "sao tome and principe": "🏝️",
      "guinea-bissau": "🌴",
      guinea: "🌴",
      "sierra leone": "🌴",
      liberia: "🌴",
      "ivory coast": "🌴",
      ghana: "🌴",
      togo: "🌴",
      benin: "🌴",
      nigeria: "🌴",
      niger: "🏜️",
      "burkina faso": "🏜️",
      mali: "🏜️",
      senegal: "🌴",
      gambia: "🌴",
      mauritania: "🏜️",
      "western sahara": "🏜️",
      "canary islands": "🌋",
      madeira: "🌺",
      azores: "🌋",
    };

    return emojiMap[dest] || "🌍";
  };

  // Get coordinates for a destination
  const getCoordinates = (destination) => {
    const dest = destination?.toLowerCase();
    return coordinateMap[dest] || { lat: 0, lng: 0 };
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/trips/popular-destinations");

        if (response.data?.data && Array.isArray(response.data.data)) {
          const formattedDestinations = response.data.data.map(
            (dest, index) => {
              const coords = getCoordinates(dest._id);
              return {
                id: index + 1,
                name: dest._id,
                ...coords,
                visitors: `${dest.count}`,
                image: getDestinationEmoji(dest._id),
                avgPrice: dest.avgPrice ? Math.round(dest.avgPrice) : 0,
                minPrice: dest.minPrice || 0,
                maxPrice: dest.maxPrice || 0,
                avgRating: dest.avgRating ? dest.avgRating.toFixed(1) : "4.5",
                tripCount: dest.count,
              };
            }
          );
          setDestinations(formattedDestinations);
        } else {
          // Fallback destinations if API fails
          setDestinations([
            {
              id: 1,
              name: "Egypt",
              lat: 26.8206,
              lng: 30.8025,
              visitors: "12",
              image: "🏺",
              avgPrice: 450,
              minPrice: 200,
              maxPrice: 800,
              avgRating: "4.8",
              tripCount: 12,
            },
            {
              id: 2,
              name: "Dubai",
              lat: 25.2048,
              lng: 55.2708,
              visitors: "8",
              image: "🏙️",
              avgPrice: 650,
              minPrice: 300,
              maxPrice: 1200,
              avgRating: "4.7",
              tripCount: 8,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        toast.error("Failed to load destinations");
        // Set fallback data
        setDestinations([
          {
            id: 1,
            name: "Egypt",
            lat: 26.8206,
            lng: 30.8025,
            visitors: "12",
            image: "🏺",
            avgPrice: 450,
            minPrice: 200,
            maxPrice: 800,
            avgRating: "4.8",
            tripCount: 12,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success("Location found!");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get your location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  const handleViewPackages = (destination) => {
    // Navigate to trips page with destination filter
    navigate(`/trips?destination=${encodeURIComponent(destination.name)}`);
  };

  const handlePlanRoute = (destination) => {
    if (userLocation) {
      const googleMapsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destination.lat},${destination.lng}`;
      window.open(googleMapsUrl, "_blank");
    } else {
      toast.error("Please enable location access first");
    }
  };

  const handleGetRecommendations = () => {
    navigate("/trips");
    toast.success("Showing personalized recommendations!");
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-natural-blue/5 to-gentle-olive/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-natural-blue/20 text-natural-blue-dark rounded-full text-sm font-medium mb-4">
              {t("map.sectionTag")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-6">
              {t("map.title")}
            </h2>
            <p className="text-xl text-cool-gray max-w-2xl mx-auto">
              {t("map.subtitle")}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-blue"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-natural-blue/5 to-gentle-olive/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-natural-blue/20 text-natural-blue-dark rounded-full text-sm font-medium mb-4">
            {t("map.sectionTag")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-6">
            {t("map.title")}
          </h2>
          <p className="text-xl text-cool-gray max-w-2xl mx-auto">
            {t("map.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-natural-blue to-muted-blue rounded-2xl p-8 shadow-blue">
              {/* Mock World Map */}
              <div className="relative h-96 bg-soft-sand/20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-natural-blue/10 to-gentle-olive/10"></div>

                {/* Location Pins */}
                {destinations?.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => setSelectedLocation(destination)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      selectedLocation?.id === destination.id
                        ? "scale-125 z-10"
                        : "hover:scale-110"
                    }`}
                    style={{
                      left: `${((destination.lng + 180) / 360) * 100}%`,
                      top: `${((90 - destination.lat) / 180) * 100}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-warm-orange rounded-full flex items-center justify-center shadow-warm animate-pulse">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      {selectedLocation?.id === destination.id && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                          <span className="text-sm font-medium text-deep-charcoal">
                            {destination.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}

                {/* User Location */}
                {userLocation && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                    style={{
                      left: `${((userLocation.lng + 180) / 360) * 100}%`,
                      top: `${((90 - userLocation.lat) / 180) * 100}%`,
                    }}
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                )}
              </div>

              {/* Get Location Button */}
              <button
                onClick={getUserLocation}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg"
                title="Get my location"
              >
                <Navigation className="w-5 h-5 text-natural-blue" />
              </button>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {/* Location Info */}
            {selectedLocation ? (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{selectedLocation.image}</div>
                  <h3 className="text-2xl font-bold text-deep-charcoal">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-cool-gray">
                    {selectedLocation.tripCount} trips available
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-natural-blue/10 rounded-lg">
                    <span className="text-sm font-medium text-deep-charcoal">
                      {t("map.averageCost")}
                    </span>
                    <span className="text-sm text-natural-blue">
                      ${selectedLocation.avgPrice}/{t("map.day")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-warm-orange/10 rounded-lg">
                    <span className="text-sm font-medium text-deep-charcoal">
                      Price Range
                    </span>
                    <span className="text-sm text-warm-orange-dark">
                      ${selectedLocation.minPrice} - $
                      {selectedLocation.maxPrice}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gentle-olive/10 rounded-lg">
                    <span className="text-sm font-medium text-deep-charcoal">
                      Average Rating
                    </span>
                    <span className="text-sm text-gentle-olive-dark">
                      ⭐ {selectedLocation.avgRating}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewPackages(selectedLocation)}
                  className="w-full mt-4 py-3 bg-natural-blue text-white rounded-xl hover:bg-natural-blue-dark transition-all duration-300 font-medium"
                >
                  {t("map.viewPackages")}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                <MapPin className="w-12 h-12 text-cool-gray mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-deep-charcoal mb-2">
                  {t("map.selectDestination")}
                </h3>
                <p className="text-cool-gray">{t("map.clickToExplore")}</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h4 className="text-lg font-semibold text-deep-charcoal mb-4">
                {t("map.quickActions")}
              </h4>

              <div className="space-y-3">
                <button
                  onClick={handleGetRecommendations}
                  className="w-full flex items-center gap-3 p-3 bg-natural-blue/10 rounded-lg hover:bg-natural-blue/20 transition-colors"
                >
                  <Zap className="w-5 h-5 text-natural-blue" />
                  <span className="text-sm font-medium text-deep-charcoal">
                    {t("map.getRecommendations")}
                  </span>
                </button>

                <button
                  onClick={() =>
                    selectedLocation
                      ? handlePlanRoute(selectedLocation)
                      : toast.error("Please select a destination first")
                  }
                  className="w-full flex items-center gap-3 p-3 bg-warm-orange/10 rounded-lg hover:bg-warm-orange/20 transition-colors"
                >
                  <Navigation className="w-5 h-5 text-warm-orange" />
                  <span className="text-sm font-medium text-deep-charcoal">
                    {t("map.planRoute")}
                  </span>
                </button>

                {selectedLocation && (
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/${encodeURIComponent(
                          selectedLocation.name
                        )}`,
                        "_blank"
                      )
                    }
                    className="w-full flex items-center gap-3 p-3 bg-gentle-olive/10 rounded-lg hover:bg-gentle-olive/20 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-gentle-olive" />
                    <span className="text-sm font-medium text-deep-charcoal">
                      View on Google Maps
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Destinations List */}
            {destinations.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h4 className="text-lg font-semibold text-deep-charcoal mb-4">
                  Popular Destinations
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => setSelectedLocation(dest)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedLocation?.id === dest.id
                          ? "bg-natural-blue/20 text-natural-blue"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{dest.image}</span>
                        <span className="text-sm font-medium">{dest.name}</span>
                      </div>
                      <span className="text-xs text-cool-gray">
                        {dest.tripCount} trips
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
