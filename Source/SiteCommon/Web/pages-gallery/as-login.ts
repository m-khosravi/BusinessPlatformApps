﻿import { AzureLogin } from './azure-login';

export class ASLogin extends AzureLogin {
    hasToken: boolean = false;

    async connect(): Promise<void> {
        await this.MS.UtilityService.connectToAzure(this.openAuthorizationType.AAS);
    }

    async onLoaded(): Promise<void> {
        super.onLoaded();

        if (this.hasToken) {
            this.setValidated();
        } else {
            await this.MS.UtilityService.getToken(this.openAuthorizationType.AAS, async () => {
                this.hasToken = this.setValidated();
            });
        }
    }
}