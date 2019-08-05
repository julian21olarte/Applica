import { NgModule } from '@angular/core';
import { TweetPipe } from './tweet/tweet';
@NgModule({
	declarations: [TweetPipe],
	imports: [],
	exports: [TweetPipe]
})
export class PipesModule {}
