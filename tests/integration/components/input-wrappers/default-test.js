import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | input-wrappers/default', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.config = {
      canValidate:  false,
      validations: {
        errors:     ['cannot be blank', 'is too short']
      }
    };
    await render(hbs`
      <InputWrappers::Default
        @config={{config}}
        @inputComponent={{component "inputs/string-input" data-test-my-input=true}}
        @labelComponent={{component "form-builder/label" data-test-my-label=true}}
      />
    `);

    assert.dom('[data-test-my-input]').exists();
    assert.dom('[data-test-my-label]').doesNotExist();
    assert.dom('.hint').doesNotExist();
    assert.dom('.errors').doesNotExist();

    this.set('config.label', 'Email');
    this.set('config.hint', 'Please type in your full email address');
    this.set('config.canValidate', true);

    assert.dom('[data-test-my-input]').exists();
    assert.dom('[data-test-my-label]').exists();
    assert.dom('.hint').hasText('Please type in your full email address');
    assert.dom('.errors').hasText('cannot be blank, is too short');
  });
});
