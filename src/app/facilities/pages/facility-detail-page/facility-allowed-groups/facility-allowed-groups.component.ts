import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Group} from '../../../../core/models/Group';
import {ActivatedRoute} from '@angular/router';
import {FacilityService} from '../../../../core/services/api/facility.service';
import {Facility} from '../../../../core/models/Facility';
import {Vo} from '../../../../core/models/Vo';
import {VoService} from '../../../../core/services/api/vo.service';

@Component({
  selector: 'app-facility-allowed-groups',
  templateUrl: './facility-allowed-groups.component.html',
  styleUrls: ['./facility-allowed-groups.component.scss']
})
export class FacilityAllowedGroupsComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(
    private voService: VoService,
    private facilityService: FacilityService,
    private route: ActivatedRoute
  ) { }

  facility: Facility;

  vos: Vo[];

  facilityId: number;

  @Input()
  groups: Group[] = [];
  selected = 'all';

  groupsToShow: Group[] = this.groups;

  ngOnInit() {
    this.route.parent.params.subscribe(parentParams => {
      this.facilityId = parentParams['facilityId'];

      this.facilityService.getAllowedVos(this.facilityId).subscribe(vos => {
          this.vos = vos;

          vos.forEach(vo => {
            this.facilityService.getAllowedGroups(this.facilityId, vo.id).subscribe(group => {
              this.groups =  this.groups.concat(group);

              this.groupsToShow = this.groups;
            });
          });
        });
    });
  }


  showGroup() {
    if (this.selected !== 'all') {
      this.groupsToShow = this.groups.filter(t => t.voId === parseInt(this.selected, 10));
    } else {
      this.groupsToShow = this.groups;
    }
  }
}
