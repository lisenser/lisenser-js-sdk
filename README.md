# Lisenser Node.js Client Library

A library for interacting with the Lisenser licensing API from a Node.js app.

## Installation

To install the library, run the following command:

`npm install lisenser`

## Usage

To use the library, import it in your code and call the appropriate function.

Here's an example of how to check the status of a license key:

```ts
import * as lisenser from 'lisenser'

const req = {
    licenseKey: 'your-license-key',
    machineId: 'your-machine-id',
    productId: 'your-product-id'
}

async function checkLicenseStatus() {
    try {
        const status = await lisenser.getLicenseStatus(req)
        console.log(status)
    } catch (error) {
        console.error(error)
    }
}

checkLicenseStatus()
```

## API

### LicenseRequest

Type: interface

Request object for licensing-related operations.

Properties:

- licenseKey (string): The license key.
- machineId (string): The machine ID.
- productId (string): The product ID.

### LicenseStatus

Type: interface

Status of a license.

Properties:

- isActive (boolean): Indicates whether the license is currently active.
- status (string): The current status of the license. One of 'expired', 'active', 'invalid', or 'no-key'.
- daysToExpiry (number | null): The number of days until the license expires, if applicable. null if the license is not set to expire.

### TrialStatus

Type: interface

Status of a trial period.

Properties:

- isActive (boolean): Indicates whether the trial period is currently active.
- status (string): The current status of the trial period. One of 'expired', 'active', 'not-started', or 'not-allowed'.
- daysToExpiry (number): The number of days until the trial period expires.

### getLicenseStatus(req: LicenseRequest): Promise<LicenseStatus>

Returns the current status of a license.

#### Parameters

- req (LicenseRequest): The license request.

#### Returns

- Promise<LicenseStatus>: The status of the license key

### activateLicenseKey(req: LicenseRequest): Promise<LicenseStatus>

Activates a license key.

#### Parameters

- req (LicenseRequest): The license request.

#### Returns

- Promise<LicenseStatus>: The status of the license key

### getTrialStatus(productId: string, machineId: string): Promise<TrialStatus>

Returns the current status of a trial period.

#### Parameters

- productId (string): The ID of the product for which to retrieve the trial status.
- machineId (string): The machine ID for which to retrieve the trial status.
