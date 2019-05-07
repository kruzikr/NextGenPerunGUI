import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoService} from '../../core/services/vo.service';
import {Vo} from '../../core/models/Vo';
import {RichMember} from '../../core/models/RichMember';
import {MembersService} from '../../core/services/members.service';
import {SideMenuItemService} from '../../shared/side-menu/side-menu-item.service';
import {SideMenuService} from '../../shared/side-menu.service';
import {UtilsService} from '../../shared/utils.service';
import {AttributesService} from '../../core/services/attributes.service';
import {TranslateService} from '@ngx-translate/core';
import {TabPage} from '../../shared/TabPage';

@Component({
  selector: 'app-member-detail-page',
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss']
})
export class MemberDetailPageComponent extends TabPage implements OnInit {

  constructor(
    private sideMenuItemService: SideMenuItemService,
    private attributeService: AttributesService,
    private translate: TranslateService,
    private sideMenuService: SideMenuService,
    private membersService: MembersService,
    private utils: UtilsService,
    private voService: VoService,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super(route, router);
  }

  vo: Vo;
  member: RichMember;

  fullName = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      const voId = params['voId'];
      const memberId = params['memberId'];

      this.voService.getVoById(voId).subscribe(vo => {
        this.vo = vo;
        this.membersService.getRichMemberWithAttributes(memberId).subscribe(member => {
          this.member = member;
          const voSideMenuItem = this.sideMenuItemService.parseVo(this.vo);
          const memberSideMenuItem = this.sideMenuItemService.parseMember(this.member);
          this.fullName = memberSideMenuItem.label;

          this.sideMenuService.setMenuItems([voSideMenuItem, memberSideMenuItem]);
        });
      });
    });
  }
}
