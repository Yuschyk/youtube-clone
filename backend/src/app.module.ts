import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./modules/database/database.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { VideoModule } from "./modules/video/video.module";
import { CommentModule } from "./modules/comment/comment.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MediaModule } from "./modules/media/media.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    VideoModule,
    CommentModule,
    AuthModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
