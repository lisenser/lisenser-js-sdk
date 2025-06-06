import axios from 'axios'

const API_URL = 'https://api.lisenser.com/v1'

/**
 * Request object for licensing-related operations.
 */
export interface LicenseRequest {
    /**
     * The license key.
     */
    licenseKey: string
    /**
     * The machine ID.
     */
    machineId: string
    /**
     * The product ID.
     */
    productId: string
}

/**
 * Status of a license.
 */
export interface LicenseStatus {
    /**
     * Indicates whether the license is currently active.
     */
    isActive: boolean
    /**
     * The current status of the license.
     * One of 'expired', 'active', 'invalid', or 'no-key'.
     */
    status: 'expired' | 'active' | 'invalid' | 'no-key'
    /**
     * The number of days until the license expires, if applicable.
     * `null` if the license is not set to expire.
     */
    daysToExpiry: number | null
    /**
     * indicating whether or not the License has been activated by
     * a different machine
     */
    isConflict?: boolean
}

/**
 * Status of a trial period.
 */
export interface TrialStatus {
    /**
     * Indicates whether the trial period is currently active.
     */
    isActive: boolean
    /**
     * The current status of the trial period.
     * One of 'expired', 'active', 'not-started', or 'not-allowed'.
     */
    status: 'expired' | 'active' | 'not-started' | 'not-allowed'
    /**
     * The number of days until the trial period expires.
     */
    daysToExpiry: number
}

/**
 * Possible statuses of trial period activation.
 */
export type TrialActivationStatus = 'started' | 'not-allowed' | 'conflict'

/**
 * Returns the current status of a license.
 * @param req The license request.
 */
export async function getLicenseStatus(req: LicenseRequest): Promise<LicenseStatus> {
    const { licenseKey: key, machineId, productId } = req
    const url = `${API_URL}/license/status`
    const resp = await axios.post<{data: LicenseStatus}>(url, { key, machineId, productId }, getHeaders())

    return resp.data.data
}

/**
 * Activates a license key.
 * @param req The license request.
 */
export async function activateLicenseKey(req: LicenseRequest): Promise<LicenseStatus> {
    const { licenseKey: key, machineId, productId } = req
    const url = `${API_URL}/license/activate`
    const resp = await axios.post<{data: LicenseStatus}>(url, { key, machineId, productId }, getHeaders())

    return resp.data.data
}

/**
 * Returns the current status of a trial period.
 * @param productId The ID of the product for which to retrieve the trial status.
 * @param machineId The machine ID for which to retrieve the trial status.
 */
export async function getTrialStatus(productId: string, machineId: string): Promise<TrialStatus> {
    const url = `${API_URL}/trial/status`
    const resp = await axios.post<{data: TrialStatus}>(url, { machineId, productId }, getHeaders())

    return resp.data.data
}

/**
 * Activates a trial period.
 * @param productId The ID of the product for which to activate the trial period.
 * @param machineId The machine ID for which to activate the trial period.
 */
export async function startTrial(productId: string, machineId: string): Promise<TrialActivationStatus> {
    const url = `${API_URL}/trial/activate`
    const resp = await axios.post<{data: TrialActivationStatus}>(url, { machineId, productId }, getHeaders())

    return resp.data.data
}

/**
 * Requests an OTP code to be sent for license reset.
 * @param req The license reset request.
 */
export async function requestOtpForLicenseReset(productId: string, licenseKey: string): Promise<boolean> {
    const url = `${API_URL}/license/reset/send-otp`
    const resp = await axios.post<{data: {sent: boolean}}>(url, { key: licenseKey, productId }, getHeaders())

    return resp.data.data?.sent
}

/**
 * Commits a license reset using the provided OTP.
 * @param req The license reset commit request.
 */
export async function resetLicense(otp: string, productId: string, licenseKey: string): Promise<boolean> {
    const url = `${API_URL}/license/reset/commit`
    const resp = await axios.post<{data: {reset: boolean}}>(url, { key: licenseKey, productId, otp }, getHeaders())

    return resp.data.data?.reset
}

/**
 * Generates a third party token for the given license.
 * @param req The license request.
 */
export async function generate3rdPartyToken(req: LicenseRequest): Promise<string> {
    const { licenseKey: key, machineId, productId } = req
    const url = `${API_URL}/3rd-party-token/generate`
    const resp = await axios.post<{data: {token: string}}>(url, { key, machineId, productId }, getHeaders())

    return resp.data.data.token
}

function getHeaders() {
    // @ts-ignore
    if (typeof process === 'undefined') {
        return {}
    }

    // @ts-ignore
    const { platform } = process

    if (!platform) {
        return {}
    }

    return {
        headers: {
            'User-Agent': `Lisenser JS SDK / ${platform}`,
        }
    }
}