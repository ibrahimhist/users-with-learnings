import { Component, OnInit, Input } from '@angular/core';

import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() icon?: string | IconName;
  @Input() prefix?: IconPrefix;

  @Input() customIcon?: string;

  @Input() color?: string;

  constructor() {
    this.prefix = 'fas';
  }

  ngOnInit(): void {}

  get iconClass() {
    let defaultClass = '';

    if (this.color) {
      defaultClass += ' ' + 'app-icon--' + this.color;
    }

    return defaultClass;
  }

  get getIconValue(): IconProp {
    return [this.prefix as IconPrefix, this.icon as IconName];
  }
}
