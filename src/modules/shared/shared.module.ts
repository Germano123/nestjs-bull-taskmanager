import { Module } from "@nestjs/common";

const providers = [];

@Module({
    imports: [],
    providers,
    exports: [...providers],
})
export class SharedModule {}