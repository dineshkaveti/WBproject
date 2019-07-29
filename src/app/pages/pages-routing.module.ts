import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages-component';
import { LanguageComponent } from './language/language.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: 'src/app/pages/avail-dashboard/avail-dashboard.module#AvailDashboardModule'
      },
      {
        path: 'dashboard',
        loadChildren: 'src/app/pages/avail-dashboard/avail-dashboard.module#AvailDashboardModule'
      },
      {
        path: 'titles',
        loadChildren: 'src/app/pages/avail-titles/avail-titles.module#AvailTitlesModule'
      },

      {
        path: 'details',
        loadChildren: 'src/app/pages/avail-details/avail-details.module#AvailDetailsModule'
      },
      {
        path: 'apo',
        loadChildren: 'src/app/pages/apo-titles/apo-titles.module#APOTitlesModule'
      },
      {
        path: 'metadata',
        loadChildren: 'src/app/pages/metadata/metadata.module#MetaDataModule'
      },
      {
        path: 'insight',
        loadChildren: 'src/app/pages/apo-insight/apo-insight.module#AvailInsightModule'
      },
      {
        path:'transconfig',
        loadChildren: 'src/app/pages/translation-config/translation-config.module#TranslationConfigModule'
        },
        {
          path:'translation',
          loadChildren: 'src/app/pages/avail-translation/avail-translation.module#AvailTranslationModule'
        },
      {
        path:'rating',
        loadChildren: 'src/app/pages/avail-translation/avail-translation.module#AvailTranslationModule'
      },
      {
        path:'clarification',
        loadChildren: 'src/app/pages/avail-translation/avail-translation.module#AvailTranslationModule'
      },
      {
        path:'complete',
        loadChildren: 'src/app/pages/avail-complete/avail-complete.module#AvailCompleteModule'
      },
      {
        path:'overdue',
        loadChildren: 'src/app/pages/avail-overdue/avail-overdue.module#AvailOverdueModule'
      },
      {
        path:'escalation',
        loadChildren: 'src/app/pages/avail-escalation/avail-escalation.module#AvailEscalationModule'
      },
      {
        path:'profile',
        loadChildren: 'src/app/pages/profile-page/profile-page.module#ProfilePageModule'
      },
      {
        path:'language',
        component:LanguageComponent
      }
    ]
  }
]

// const routes: Routes = [
//    {path: 'avail', component:AvailDashboardComponent}
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
