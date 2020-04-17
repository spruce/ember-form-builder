import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | input-wrappers/inline', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.config = {
      canValidate:  false,
      validations: {
        errors:     ['cannot be blank', 'is too short']
      }
    };
    await render(hbs`
      <InputWrappers::Inline
        @config={{config}}
        @inputComponent={{component "inputs/string-input" data-test-my-input=true}}
        @labelComponent={{component "form-builder/label" for="my-label"}}
      />
    `);

    assert.dom('[for="my-label"]').exists();
    assert.dom('[data-test-my-input]').exists();
    assert.dom('.text-muted').doesNotExist();
    assert.dom('.invalid-feedback').doesNotExist();

    this.set('config.texts', { hint: 'Please type in your full email address' });
    this.set('config.canValidate', true);

    assert.dom('.text-muted').hasText('Please type in your full email address');
    assert.dom('.invalid-feedback').hasText('cannot be blank, is too short');
  });
});
