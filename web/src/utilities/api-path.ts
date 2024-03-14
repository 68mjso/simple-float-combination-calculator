import { STEAM_ID } from "./config";

const BASE_URL = "https://steamcommunity.com";
const BASE_URL_API = "http://api.steampowered.com";
const BASE_CS_FLOAT = "https://api.csfloat.com";

const I_STEAM_USER = "ISteamUser";
const VER_0002 = "v0002";

// const PROFILES = "profiles";

const INVERTORY = "inventory";

const APP_ID = "730";

const GAME = "2";

export const BASE_INSPECT_LINK = `steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S${STEAM_ID}`;

export const GET_PLAYER_SUMMARIES = `${BASE_URL_API}/${I_STEAM_USER}/GetPlayerSummaries/${VER_0002}/`;

export const GET_INVENTORY = `${BASE_URL}/${INVERTORY}/${STEAM_ID}/${APP_ID}/${GAME}?l=english&count=1000`;

export const INSPECT_ITEM = `${BASE_CS_FLOAT}/?s=${STEAM_ID}&`;

export const INSPECT_ITEM_WITH_URL = `${BASE_CS_FLOAT}/?url=`;

export const INSPECT_ITEM_BULK = `${BASE_CS_FLOAT}/bulk`;
