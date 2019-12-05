import { ManualComponent } from './manual.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextoSharedModule } from 'app/shared/shared.module';
import { manualRoute } from './manual.route';

const ENTITY_STATES = [...manualRoute];

@NgModule({
    imports: [ContextoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ManualComponent
    ]
  })
  export class ContextoManualModule {}
  